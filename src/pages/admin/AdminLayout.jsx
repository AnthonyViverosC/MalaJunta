// Layout base del panel: barra lateral con navegación + área de contenido.
// Las secciones se renderizan con <Outlet/> (rutas hijas).
import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  Percent,
  CalendarDays,
  Settings,
  LogOut,
  Menu as MenuIcon,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { BRAND, BRAND_LOGO } from '../../config/defaults.js';

const enlaces = [
  { to: '/admin', fin: true, icono: LayoutDashboard, texto: 'Dashboard' },
  { to: '/admin/productos', icono: Package, texto: 'Productos' },
  { to: '/admin/categorias', icono: Tags, texto: 'Categorías' },
  { to: '/admin/promociones', icono: Percent, texto: 'Promociones' },
  { to: '/admin/eventos', icono: CalendarDays, texto: 'Eventos' },
  { to: '/admin/configuracion', icono: Settings, texto: 'Configuración' },
];

export default function AdminLayout() {
  const { perfil, cerrarSesion } = useAuth();
  const navigate = useNavigate();
  const [abierto, setAbierto] = useState(false);

  async function onLogout() {
    await cerrarSesion();
    navigate('/admin/login', { replace: true });
  }

  return (
    <div className="min-h-screen bg-ink-950 text-bone flex">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-ink-900 border-r-2 border-ink-700 flex flex-col transition-transform lg:translate-x-0 ${
          abierto ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b-2 border-ink-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-acid-400/70 shrink-0">
              <img src={BRAND_LOGO} alt={BRAND} className="w-full h-full object-cover" />
            </span>
            <span className="font-display uppercase text-lg text-bone truncate">{BRAND}</span>
          </div>
          <button className="lg:hidden text-bone-muted" onClick={() => setAbierto(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {enlaces.map((e) => (
            <NavLink
              key={e.to}
              to={e.to}
              end={e.fin}
              onClick={() => setAbierto(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider border-2 transition ${
                  isActive
                    ? 'bg-acid-400 text-ink-950 border-acid-400'
                    : 'text-bone-muted border-transparent hover:text-bone hover:border-ink-600'
                }`
              }
            >
              <e.icono className="h-4 w-4" />
              {e.texto}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t-2 border-ink-700 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-bone-muted hover:text-acid-400 transition"
          >
            <ExternalLink className="h-4 w-4" /> Ver la carta
          </a>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-bone-muted hover:text-flame-500 transition"
          >
            <LogOut className="h-4 w-4" /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Overlay móvil */}
      {abierto && (
        <div className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setAbierto(false)} />
      )}

      {/* Contenido */}
      <div className="flex-1 lg:ml-64 min-w-0">
        <header className="sticky top-0 z-20 bg-ink-900/90 backdrop-blur border-b-2 border-ink-700 px-4 md:px-8 py-3 flex items-center justify-between">
          <button className="lg:hidden text-bone" onClick={() => setAbierto(true)}>
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="ml-auto flex items-center gap-3">
            <div className="text-right">
              <p className="font-mono text-sm leading-tight text-bone">{perfil?.nombre}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-acid-400">{perfil?.rol}</p>
            </div>
            <div className="h-9 w-9 grid place-items-center bg-acid-400 text-ink-950 font-display">
              {(perfil?.nombre || '?').charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
