-- Vehicles table policies
-- Already exists: SELECT policy for public
-- Add INSERT policy for authenticated users
CREATE POLICY "Allow authenticated insert" ON vehicles 
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Add UPDATE policy for authenticated users  
CREATE POLICY "Allow authenticated update" ON vehicles 
FOR UPDATE USING (auth.role() = 'authenticated');

-- Add DELETE policy for authenticated users
CREATE POLICY "Allow authenticated delete" ON vehicles 
FOR DELETE USING (auth.role() = 'authenticated');