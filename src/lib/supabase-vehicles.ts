import { supabase } from "@/lib/supabase";
import type { Vehicle } from "@/data/vehicles";

export async function fetchVehiclesFromSupabase(): Promise<Vehicle[]> {
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching vehicles:", error);
    return [];
  }

  return data.map((v: any) => ({
    id: v.id,
    brand: v.brand,
    model: v.model,
    year: v.year,
    price: v.price,
    monthly: v.monthly,
    mileage: v.mileage,
    fuel: v.fuel as Vehicle["fuel"],
    transmission: v.transmission as Vehicle["transmission"],
    featured: v.featured,
    condition: (v.condition || "Seminuevo") as "Nuevo" | "Seminuevo",
    images: v.images || [],
    description: v.description || "",
    specs: v.specs || [],
  }));
}

export async function saveVehicleToSupabase(vehicle: Vehicle): Promise<void> {
  const { error } = await supabase.from("vehicles").upsert({
    id: vehicle.id,
    brand: vehicle.brand,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    monthly: vehicle.monthly,
    mileage: vehicle.mileage,
    fuel: vehicle.fuel,
    transmission: vehicle.transmission,
    featured: vehicle.featured,
    condition: vehicle.condition || "Seminuevo",
    images: vehicle.images,
    description: vehicle.description,
    specs: vehicle.specs,
  }, { onConflict: "id" });

  if (error) {
    console.error("Error saving vehicle:", error);
    throw error;
  }
}

export async function deleteVehicleFromSupabase(id: string): Promise<void> {
  const { error } = await supabase.from("vehicles").delete().eq("id", id);

  if (error) {
    console.error("Error deleting vehicle:", error);
    throw error;
  }
}
