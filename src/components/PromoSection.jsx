// Sección pública de promociones activas. Se muestra sobre el menú.
import { motion } from 'framer-motion';
import { Percent, Package, Star } from 'lucide-react';
import { usePromociones } from '../hooks/usePromociones.js';

const ICONO = { descuento: Percent, combo: Package, destacado: Star };

function valorTexto(p) {
  if (p.tipo === 'descuento') return `${p.valor}% OFF`;
  if (p.tipo === 'combo') return `$${Number(p.valor || 0).toLocaleString('es-CO')}.000`;
  return 'Destacado';
}

export default function PromoSection() {
  const promociones = usePromociones();
  if (!promociones.length) return null;

  return (
    <section id="promociones" className="scroll-mt-32 max-w-7xl mx-auto px-3 md:px-8 py-10 md:py-16">
      <div className="mb-6 md:mb-10 flex items-end gap-3 md:gap-5">
        <span className="font-mono text-flame-500 text-sm md:text-base leading-none pb-1">[!]</span>
        <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.85] text-bone">
          Promos
        </h2>
        <div className="flex-1 h-0.5 bg-flame-600 mb-2 md:mb-3" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {promociones.map((p, i) => {
          const Icono = ICONO[p.tipo] || Percent;
          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative bg-ink-900 border-2 border-flame-600 hover:border-flame-400 transition-all duration-200 hover:-translate-y-0.5"
            >
              {p.imagen_url && (
                <div className="relative aspect-[16/9] overflow-hidden bg-ink-800 border-b-2 border-flame-600">
                  <img
                    src={p.imagen_url}
                    alt={p.titulo}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display uppercase text-xl text-bone leading-[0.95]">{p.titulo}</h3>
                  <span className="shrink-0 flex items-center gap-1 font-mono text-xs uppercase tracking-wider px-2 py-1 bg-flame-500 text-white">
                    <Icono className="h-3.5 w-3.5" /> {valorTexto(p)}
                  </span>
                </div>
                {p.productos?.nombre && (
                  <p className="font-mono text-[11px] uppercase tracking-wide text-acid-400 mb-1">
                    {p.productos.nombre}
                  </p>
                )}
                {p.descripcion && (
                  <p className="font-mono text-xs text-bone-muted leading-relaxed">{p.descripcion}</p>
                )}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
