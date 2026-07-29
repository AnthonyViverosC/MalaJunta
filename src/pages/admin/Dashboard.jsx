// Dashboard con estadísticas del negocio (lee en vivo desde Supabase).
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Tags,
  AlertTriangle,
  Percent,
  Clock,
  Eye,
  Star,
  Plus,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';
import { supabase } from '../../lib/supabase.js';
import { formatearPrecio } from '../../data/menu.js';

function Tarjeta({ icono: Icono, etiqueta, valor, acento = 'acid' }) {
  const color =
    acento === 'flame' ? 'text-flame-500 border-flame-600' : 'text-acid-400 border-ink-600';
  return (
    <div className={`bg-ink-900 border-2 ${color} p-5`}>
      <div className="flex items-center justify-between">
        <Icono className={`h-6 w-6 ${acento === 'flame' ? 'text-flame-500' : 'text-acid-400'}`} />
        <span className="font-display text-4xl text-bone leading-none">{valor}</span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-widest text-bone-muted mt-3">{etiqueta}</p>
    </div>
  );
}

const ACCIONES = [
  { to: '/admin/productos', icono: Plus, texto: 'Nuevo producto' },
  { to: '/admin/categorias', icono: Tags, texto: 'Categorías' },
  { to: '/admin/promociones', icono: Percent, texto: 'Promociones' },
  { to: '/admin/eventos', icono: CalendarDays, texto: 'Eventos' },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [ultimos, setUltimos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargar() {
      try {
        const [prod, cats, activos, agotados, destacados, promos, recientes] = await Promise.all([
          supabase.from('productos').select('id', { count: 'exact', head: true }),
          supabase.from('categorias').select('id', { count: 'exact', head: true }),
          supabase.from('productos').select('id', { count: 'exact', head: true }).eq('activo', true),
          supabase.from('productos').select('id', { count: 'exact', head: true }).eq('disponible', false),
          supabase.from('productos').select('id', { count: 'exact', head: true }).eq('destacado', true),
          supabase.from('promociones').select('id', { count: 'exact', head: true }).eq('activa', true),
          supabase
            .from('productos')
            .select('id, nombre, precio, creado_en')
            .order('creado_en', { ascending: false })
            .limit(6),
        ]);

        setStats({
          productos: prod.count ?? 0,
          categorias: cats.count ?? 0,
          activos: activos.count ?? 0,
          agotados: agotados.count ?? 0,
          destacados: destacados.count ?? 0,
          promociones: promos.count ?? 0,
        });
        setUltimos(recientes.data || []);
      } catch (e) {
        console.error('[Dashboard] Error cargando estadísticas:', e);
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  if (cargando) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="h-10 w-10 border-2 border-ink-600 border-t-acid-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display uppercase text-4xl text-bone leading-none">Dashboard</h1>
        <p className="font-mono text-sm text-bone-muted mt-1">Resumen general de MALA JUNTA.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <Tarjeta icono={Package} etiqueta="Productos" valor={stats.productos} />
        <Tarjeta icono={Eye} etiqueta="Activos" valor={stats.activos} />
        <Tarjeta icono={Tags} etiqueta="Categorías" valor={stats.categorias} />
        <Tarjeta icono={Star} etiqueta="Destacados" valor={stats.destacados} />
        <Tarjeta icono={AlertTriangle} etiqueta="Agotados" valor={stats.agotados} acento="flame" />
        <Tarjeta icono={Percent} etiqueta="Promos activas" valor={stats.promociones} />
      </div>

      {/* Acciones rápidas */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-acid-400 mb-3">Acciones rápidas</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ACCIONES.map((a) => (
            <Link
              key={a.to}
              to={a.to}
              className="group bg-ink-900 border-2 border-ink-600 hover:border-acid-400 p-4 flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-bone">
                <a.icono className="h-4 w-4 text-acid-400" />
                {a.texto}
              </span>
              <ArrowRight className="h-4 w-4 text-bone-muted group-hover:text-acid-400 group-hover:translate-x-0.5 transition" />
            </Link>
          ))}
        </div>
      </div>

      {/* Últimos productos */}
      <div className="bg-ink-900 border-2 border-ink-600 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5 text-acid-400" />
          <h2 className="font-display uppercase text-xl text-bone">Últimos productos agregados</h2>
        </div>
        {ultimos.length === 0 ? (
          <p className="font-mono text-sm text-bone-muted">Aún no hay productos.</p>
        ) : (
          <ul className="divide-y divide-ink-700">
            {ultimos.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3">
                <span className="font-mono text-sm text-bone">{p.nombre}</span>
                <span className="bg-acid-400 text-ink-950 font-display text-sm px-2 py-0.5">
                  {formatearPrecio(Number(p.precio))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
