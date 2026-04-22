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
