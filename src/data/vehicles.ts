export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  monthly: number;
  mileage: number;
  fuel: "Gasolina" | "Híbrido" | "Eléctrico" | "Diésel" | "Gas Natural" | "Híbrido Enchufable";
  transmission: "Automática" | "Manual" | "CVT" | "DSG" | "Tiptronic";
  featured?: boolean;
  condition: "Nuevo" | "Seminuevo" | "Próximamente" | "Apartado";
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
};

const u = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const vehicles: Vehicle[] = [
  {
    id: "mazda-cx5-2022",
    brand: "Mazda",
    model: "CX-5 Grand Touring",
    year: 2022,
    price: 459000,
    monthly: 8990,
    mileage: 38500,
    fuel: "Gasolina",
    transmission: "Automática",
    featured: true,
    condition: "Seminuevo",
    images: [
      u("photo-1503376780353-7e6692767b70"),
      u("photo-1494976388531-d1058494cdd8"),
      u("photo-1542362567-b07e54358753"),
    ],
    description:
      "SUV premium en condiciones excepcionales. Un solo dueño, mantenimientos en agencia y revisión mecánica completa.",
    specs: [
      { label: "Motor", value: "2.5L SkyActiv" },
      { label: "Tracción", value: "AWD" },
      { label: "Color", value: "Gris Machine" },
      { label: "Interior", value: "Piel negra" },
    ],
  },
  {
    id: "tesla-model3-2023",
    brand: "Tesla",
    model: "Model 3 Long Range",
    year: 2023,
    price: 749000,
    monthly: 14500,
    mileage: 12300,
    fuel: "Eléctrico",
    transmission: "Automática",
    featured: true,
    condition: "Seminuevo",
    images: [
      u("photo-1560958089-b8a1929cea89"),
      u("photo-1571987502227-9231b837d92a"),
      u("photo-1617788138017-80ad40651399"),
    ],
    description:
      "Tesla Model 3 con autonomía extendida, Autopilot y interior premium. Garantía vigente del fabricante.",
    specs: [
      { label: "Autonomía", value: "576 km" },
      { label: "0-100 km/h", value: "4.4 s" },
      { label: "Color", value: "Blanco Perla" },
      { label: "Interior", value: "Negro premium" },
    ],
  },
  {
    id: "toyota-corolla-2021",
    brand: "Toyota",
    model: "Corolla SE Híbrido",
    year: 2021,
    price: 339000,
    monthly: 6790,
    mileage: 52800,
    fuel: "Híbrido",
    transmission: "Automática",
    condition: "Seminuevo",
    images: [
      u("photo-1619682817481-e994bc0e4d5a"),
      u("photo-1623006772851-a8bf2c47b7c6"),
      u("photo-1605559424843-9e4c228bf1c2"),
    ],
    description:
      "Eficiencia híbrida con la confiabilidad Toyota. Ideal para ciudad con bajo consumo y excelente equipamiento.",
    specs: [
      { label: "Rendimiento", value: "23 km/l" },
      { label: "Motor", value: "1.8L Hybrid" },
      { label: "Color", value: "Plata Metálico" },
      { label: "Interior", value: "Tela negra" },
    ],
  },
  {
    id: "bmw-serie3-2022",
    brand: "BMW",
    model: "Serie 3 330i M Sport",
    year: 2022,
    price: 685000,
    monthly: 13200,
    mileage: 28900,
    fuel: "Gasolina",
    transmission: "Automática",
    featured: true,
    condition: "Seminuevo",
    images: [u("photo-1555215695-3004980ad54e"), u("photo-1606664515524-ed2f786a0bd6")],
    description:
      "Sedán deportivo con paquete M Sport. Manejo ágil, tecnología iDrive 8 y acabados de lujo.",
    specs: [
      { label: "Motor", value: "2.0L TwinPower Turbo" },
      { label: "Potencia", value: "255 hp" },
      { label: "Color", value: "Negro Zafiro" },
      { label: "Interior", value: "Piel Vernasca" },
    ],
  },
  {
    id: "vw-jetta-2023",
    brand: "Volkswagen",
    model: "Jetta GLI",
    year: 2023,
    price: 489000,
    monthly: 9450,
    mileage: 18200,
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "Seminuevo",
    images: [u("photo-1612825173281-9a193378527e"), u("photo-1606152421802-db97b9c7a11b")],
    description:
      "Sedán deportivo turbo con DSG. Equipamiento completo, faros LED matrix y asientos deportivos.",
    specs: [
      { label: "Motor", value: "2.0L TSI" },
      { label: "Potencia", value: "228 hp" },
      { label: "Color", value: "Rojo Tornado" },
      { label: "Interior", value: "Piel/Alcántara" },
    ],
  },
  {
    id: "honda-crv-2022",
    brand: "Honda",
    model: "CR-V Touring",
    year: 2022,
    price: 519000,
    monthly: 10100,
    mileage: 41200,
    fuel: "Gasolina",
    transmission: "Automática",
    condition: "Seminuevo",
    images: [u("photo-1568844293986-8d0400bd4745"), u("photo-1502877338535-766e1452684a")],
    description:
      "SUV familiar con el equipamiento más alto. Espacio premium, tecnología Honda Sensing y excelente economía.",
    specs: [
      { label: "Motor", value: "1.5L Turbo" },
      { label: "Tracción", value: "AWD" },
      { label: "Color", value: "Blanco Platino" },
      { label: "Interior", value: "Piel beige" },
    ],
  },
];

export const brands = Array.from(new Set(vehicles.map((v) => v.brand))).sort();
export const fuels = Array.from(new Set(vehicles.map((v) => v.fuel)));
export const transmissions = Array.from(new Set(vehicles.map((v) => v.transmission)));
