// Cliente de Supabase (único para toda la app).
// Las claves se leen desde variables de entorno (.env), nunca se escriben en el código.
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ¿Está configurado el backend? (para hacer fallback elegante si aún no)
export const supabaseConfigurado = Boolean(url && anonKey);

// Aviso claro en consola si faltan las variables (la web sigue en modo demo).
if (!supabaseConfigurado) {
  console.warn(
    '[Supabase] Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. ' +
      'La web funciona en modo demostración con datos estáticos. ' +
      'Crea un archivo .env a partir de .env.example para activar el panel.'
  );
}

// Usamos valores de marcador de posición cuando no hay configuración para que
// createClient() NUNCA lance una excepción y la app pueda arrancar en modo demo.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
