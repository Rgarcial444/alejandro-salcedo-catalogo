-- Tabla para almacenar submissions del formulario de contacto
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Política de lectura para el admin
CREATE POLICY "Admin can read" ON contact_submissions FOR SELECT 
  USING (auth.jwt() IS NOT NULL);

-- Política de inserción pública (para que el formulario funcione)
CREATE POLICY "Allow public insert" ON contact_submissions FOR INSERT 
  WITH CHECK (true);

-- Nota: Para recibir notificaciones por email, configurar en Supabase:
-- 1. Ir a Database > Functions
-- 2. Crear un trigger que envíe email cuando se insert un nuevo registro
-- O usar la integración de Slack/Discord para notificaciones