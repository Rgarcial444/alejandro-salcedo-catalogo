-- Crear usuarios con contraseña en Supabase Auth
-- NOTA: Esto es solo para demo. En producción, los usuarios deberían crearse desde el panel de Supabase

-- Para crear usuarios con contraseña, necesitas hacer esto desde:
-- Supabase Dashboard > Authentication > Users > "Add user"

-- O usar la API de Admin:
-- POST /auth/v1/admin/users
-- Con el service_role key

-- Por ahora, aquí están las instrucciones para configurar:

-- 1. Ve a Supabase Dashboard > Authentication > Users
-- 2. Click en "Add user"
-- 3. Ingresa el email y contraseña para cada usuario:
--    - salcedoalejandro058@gmail.com
--    - rgarcialimon@gmail.com
-- 4. Click en "Create user"

-- El login ahora acepta email + contraseña en lugar de magic link