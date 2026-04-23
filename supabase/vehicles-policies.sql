-- Vehicles table policies
-- Public can read; only authenticated users can write
-- Safe to re-run: drops existing policies before creating

DROP POLICY IF EXISTS "Allow public read" ON vehicles;
CREATE POLICY "Allow public read" ON vehicles
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow authenticated insert" ON vehicles;
CREATE POLICY "Allow authenticated insert" ON vehicles
FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update" ON vehicles;
CREATE POLICY "Allow authenticated update" ON vehicles
FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete" ON vehicles;
CREATE POLICY "Allow authenticated delete" ON vehicles
FOR DELETE TO authenticated USING (true);
