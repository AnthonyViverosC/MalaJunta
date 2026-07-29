# MALA JUNTA · Carta digital

Carta digital y panel de administración para el bar **MALA JUNTA**.
Estética underground/urbana: negro carbón, verde ácido eléctrico y rojo/magenta.

## Stack

React 18 · Vite 5 · Tailwind CSS 3 · Supabase (Auth + Postgres + Storage) ·
Framer Motion · dnd-kit · React Router 7 · lucide-react.

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:5173
```

Sin `.env`, la web funciona en **modo demostración** con datos estáticos.
Para activar el panel de administración y la persistencia real, configura Supabase
siguiendo `supabase/README.md` y crea tu `.env` a partir de `.env.example`.

## Rutas

- `/` — carta pública (categorías, productos, promociones, eventos).
- `/admin/login` — inicio de sesión del panel.
- `/admin` — panel: dashboard, productos, categorías, promociones, eventos y configuración.

## Scripts

- `npm run dev` — servidor de desarrollo.
- `npm run build` — compilación de producción (`dist/`).
- `npm run preview` — previsualización de la build.
# MalaJunta
