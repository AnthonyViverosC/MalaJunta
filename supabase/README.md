# Guía de configuración de Supabase — MALA JUNTA

Sigue estos pasos **una sola vez** para conectar la carta a la base de datos.
Mientras no configures Supabase, la web funciona en **modo demostración** con datos
estáticos (carpeta `src/data/menu.js`); el panel de administración necesita Supabase.

## 1. Crear la cuenta y el proyecto

1. Entra a **https://supabase.com** → **Start your project** → inicia sesión (es gratis).
2. **New project**:
   - **Name:** `mala-junta`
   - **Database Password:** genera una y **guárdala**.
   - **Region:** elige la más cercana (ej. _East US_ o _South America_).
3. Espera ~2 minutos a que se aprovisione el proyecto.

## 2. Crear las tablas (esquema)

1. En el menú lateral abre **SQL Editor** → **New query**.
2. Copia y pega TODO el contenido de `supabase/migrations/0001_schema.sql` y pulsa **Run**.
3. Repite con `0004_config_extra.sql`, `0005_eventos.sql` y `0006_eventos_video.sql`.
4. Para el almacenamiento de imágenes, ejecuta `0003_storage.sql`.

## 3. (Opcional) Cargar datos de ejemplo

1. Nueva query en el **SQL Editor**.
2. Pega TODO el contenido de `supabase/migrations/0002_seed.sql` y pulsa **Run**.
3. Ve a **Table Editor → productos**: verás la carta de ejemplo cargada.

## 4. Obtener las claves de conexión

1. **Project Settings** (engranaje) → **API**.
2. Copia:
   - **Project URL** → va en `VITE_SUPABASE_URL`
   - **anon public** key → va en `VITE_SUPABASE_ANON_KEY`

## 5. Configurar el proyecto local

1. En la raíz del proyecto, copia `.env.example` como `.env`.
2. Pega las dos claves del paso anterior.
3. Reinicia el servidor: `npm run dev`.
4. La web ahora carga el menú **desde la base de datos**.

## 6. Crear el usuario administrador

1. En Supabase → **Authentication → Users → Add user** (con email y contraseña).
2. Ese usuario podrá entrar en `/admin/login`.
   El **primer** perfil creado queda como **Administrador** automáticamente.

## 7. Configurar Vercel (producción)

En Vercel → **Settings → Environment Variables**, agrega:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Luego haz **Redeploy**.
