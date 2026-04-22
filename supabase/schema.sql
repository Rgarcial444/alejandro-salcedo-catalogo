-- Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price INTEGER NOT NULL,
  monthly INTEGER NOT NULL,
  mileage INTEGER NOT NULL,
  fuel TEXT NOT NULL,
  transmission TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  condition TEXT NOT NULL DEFAULT 'Seminuevo',
  images TEXT[] NOT NULL,
  description TEXT,
  specs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Allow public read" ON vehicles FOR SELECT USING (true);

-- Insert sample vehicles
INSERT INTO vehicles (id, brand, model, year, price, monthly, mileage, fuel, transmission, featured, condition, images, description, specs) VALUES
('mazda-cx5-2022', 'Mazda', 'CX-5 Grand Touring', 2022, 459000, 8990, 38500, 'Gasolina', 'Automática', true, 'Seminuevo', 
  ARRAY['https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80'],
  'SUV premium en condiciones excepcionales. Un solo dueño, mantenimientos en agencia y revisión mecánica completa.',
  '[{"label":"Motor","value":"2.5L SkyActiv"},{"label":"Tracción","value":"AWD"},{"label":"Color","value":"Gris Machine"}]'
),
('tesla-model3-2023', 'Tesla', 'Model 3 Long Range', 2023, 749000, 14500, 12300, 'Eléctrico', 'Automática', true, 'Seminuevo',
  ARRAY['https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80'],
  'Tesla Model 3 con autonomía extendida, Autopilot y interior premium.',
  '[{"label":"Autonomía","value":"576 km"},{"label":"0-100 km/h","value":"4.4 s"}]'
),
('toyota-corolla-2021', 'Toyota', 'Corolla SE Híbrido', 2021, 339000, 6790, 52800, 'Híbrido', 'Automática', false, 'Seminuevo',
  ARRAY['https://images.unsplash.com/photo-1619682817481-e994bc0e4d5a?auto=format&fit=crop&w=1400&q=80'],
  'Eficiencia híbrida con la confiabilidad Toyota. Ideal para ciudad.',
  '[{"label":"Rendimiento","value":"23 km/l"}]'
),
('bmw-serie3-2022', 'BMW', 'Serie 3 330i M Sport', 2022, 685000, 13200, 28900, 'Gasolina', 'Automática', true, 'Seminuevo',
  ARRAY['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=80'],
  'Sedán deportivo con paquete M Sport. Manejo ágil y tecnología iDrive 8.',
  '[{"label":"Motor","value":"2.0L TwinPower Turbo"}]'
),
('vw-jetta-2023', 'Volkswagen', 'Jetta GLI', 2023, 489000, 9450, 18200, 'Gasolina', 'Automática', false, 'Seminuevo',
  ARRAY['https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=1400&q=80'],
  'Sedán deportivo turbo con DSG. Equipamiento completo.',
  '[{"label":"Motor","value":"2.0L TSI"}]'
),
('honda-crv-2022', 'Honda', 'CR-V Touring', 2022, 519000, 10100, 41200, 'Gasolina', 'Automática', false, 'Seminuevo',
  ARRAY['https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1400&q=80'],
  'SUV familiar con el equipamiento más alto. Espacio premium.',
  '[{"label":"Motor","value":"1.5L Turbo"}]'
) ON CONFLICT (id) DO NOTHING;
