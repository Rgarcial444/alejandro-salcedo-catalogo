import { useEffect, useState, useCallback, useSyncExternalStore, useMemo } from "react";
import { vehicles as seedVehicles, type Vehicle } from "@/data/vehicles";

const KEY = "as.vehicles.v1";

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
  useEffect(() => setHydrated(true), []);

  const list: Vehicle[] = useMemo(() => {
    if (!hydrated) return seedVehicles;
    try {
      return JSON.parse(snapshot);
    } catch {
      return seedVehicles;
    }
  }, [snapshot, hydrated]);

  const brands = useMemo(() => Array.from(new Set(list.map((v) => v.brand))).sort(), [list]);
  const fuels = useMemo(() => Array.from(new Set(list.map((v) => v.fuel))), [list]);
  const transmissions = useMemo(() => Array.from(new Set(list.map((v) => v.transmission))), [list]);

  const upsert = useCallback((v: Vehicle) => {
    const current = read();
    const idx = current.findIndex((x) => x.id === v.id);
    if (idx >= 0) {
      const next = [...current];
      next[idx] = v;
      write(next);
    } else {
      write([v, ...current]);
    }
  }, []);

  const remove = useCallback((id: string) => {
    write(read().filter((v) => v.id !== id));
  }, []);

  const reset = useCallback(() => write(seedVehicles), []);

  return { vehicles: list, brands, fuels, transmissions, upsert, remove, reset };
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
    .replace(/(^-|-$)/g, "");
}
