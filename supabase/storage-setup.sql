-- Storage para subir imágenes de vehículos y foto de perfil
-- Ejecutar en Supabase SQL Editor

-- 1. Crear bucket para imágenes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('images', 'images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- 2. Política para que todos puedan ver imágenes
CREATE POLICY "Public images are viewable by everyone"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- 3. Política para que usuarios autenticados puedan subir imágenes
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- 4. Política para que usuarios autenticados puedan eliminar sus propias imágenes
CREATE POLICY "Authenticated users can delete their images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'images' AND auth.role() = 'authenticated' );

-- 5. Crear tabla para guardar la foto de perfil del asesor
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'profile_photo',
  profile_photo_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar registro inicial
INSERT INTO site_settings (id, profile_photo_url) 
VALUES ('profile_photo', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80')
ON CONFLICT (id) DO NOTHING;

-- 6. Política para leer configuración del sitio (público)
CREATE POLICY "Anyone can read site settings"
ON site_settings FOR SELECT
USING (true);

-- 7. Política para actualizar configuración (solo usuarios autenticados)
CREATE POLICY "Authenticated users can update site settings"
ON site_settings FOR UPDATE
USING (auth.role() = 'authenticated');

-- Nota: Para usar storage desde el frontend, necesitas la URL del bucket y el anon key
-- Ejemplo de código para subir imagen:
/*
import { supabase } from '@/lib/supabase'

const uploadImage = async (file) => {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, file)
  
  if (error) throw error
  
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(fileName)
  
  return publicUrl
}
*/