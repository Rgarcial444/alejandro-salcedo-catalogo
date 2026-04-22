import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { vehicles as seedVehicles, type Vehicle } from "@/data/vehicles";
import {
  fetchVehiclesFromSupabase,
  saveVehicleToSupabase,
  deleteVehicleFromSupabase,
} from "@/lib/supabase-vehicles";

const KEY = "as.vehicles.v1";
const SUPABASE_KEY = "as.supabase.loaded";

function read(): Vehicle[] {
  if (typeof window === "undefined") return seedVehicles;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedVehicles;
    const parsed = JSON.parse(raw) as Vehicle[];
    if (!Array.isArray(parsed)) return seedVehicles;
    return parsed;
  } catch {
    return seedVehicles;
  }
}

function write(list: Vehicle[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("as:vehicles"));
}

const subscribe = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("as:vehicles", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("as:vehicles", cb);
    window.removeEventListener("storage", cb);
  };
};

const getSnapshot = () => {
  if (typeof window === "undefined") return JSON.stringify(seedVehicles);
  return localStorage.getItem(KEY) ?? JSON.stringify(seedVehicles);
};
const getServerSnapshot = () => JSON.stringify(seedVehicles);

export function useVehicles() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fromSupabase, setFromSupabase] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const loadFromSupabase = async () => {
      const alreadyLoaded = localStorage.getItem(SUPABASE_KEY);
      if (alreadyLoaded) return;

      setLoading(true);
      try {
        const vehicles = await fetchVehiclesFromSupabase();
        if (vehicles.length > 0) {
          write(vehicles);
          localStorage.setItem(SUPABASE_KEY, "true");
          setFromSupabase(true);
        }
      } catch (e) {
        console.log("Supabase not available, using local data");
      } finally {
        setLoading(false);
      }
    };

    loadFromSupabase();
  }, []);

  const list: Vehicle[] = (() => {
    if (!hydrated) return seedVehicles;
    try {
      return JSON.parse(snapshot);
    } catch {
      return seedVehicles;
    }
  })();

  const brands = [...new Set(list.map((v) => v.brand))].sort();
  const fuels = [...new Set(list.map((v) => v.fuel))];
  const transmissions = [...new Set(list.map((v) => v.transmission))];

  const upsert = useCallback(async (v: Vehicle) => {
    const current = read();
    const idx = current.findIndex((x) => x.id === v.id);
    if (idx >= 0) {
      const next = [...current];
      next[idx] = v;
      write(next);
    } else {
      write([v, ...current]);
    }
    try {
      await saveVehicleToSupabase(v);
    } catch (e) {
      console.log("Error saving to Supabase:", e);
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    write(read().filter((v) => v.id !== id));
    try {
      await deleteVehicleFromSupabase(id);
    } catch (e) {
      console.log("Error deleting from Supabase:", e);
    }
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(SUPABASE_KEY);
    write(seedVehicles);
  }, []);

  return {
    vehicles: list,
    brands,
    fuels,
    transmissions,
    upsert,
    remove,
    reset,
    loading,
    fromSupabase,
  };
}

export function getVehicleById(id: string): Vehicle | undefined {
  return read().find((v) => v.id === id);
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
