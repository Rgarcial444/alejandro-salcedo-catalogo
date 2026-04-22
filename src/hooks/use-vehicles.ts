import { useEffect, useState, useCallback, useSyncExternalStore } from "react";
import { vehicles as seedVehicles, type Vehicle } from "@/data/vehicles";

const KEY = "as.vehicles.v1";

function read(): Vehicle[] {
  if (typeof window === "undefined") return seedVehicles;
  try {
    const raw = window.localStorage.getItem(KEY);
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
  window.localStorage.setItem(KEY, JSON.stringify(list));
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
  return window.localStorage.getItem(KEY) ?? JSON.stringify(seedVehicles);
};
const getServerSnapshot = () => JSON.stringify(seedVehicles);

export function useVehicles() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  // Always use seed for SSR/first render to avoid hydration mismatch
  const list: Vehicle[] = hydrated
    ? (() => { try { return JSON.parse(snapshot); } catch { return seedVehicles; } })()
    : seedVehicles;

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

  return { vehicles: list, upsert, remove, reset };
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
