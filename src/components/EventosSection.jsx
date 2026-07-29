// Sección pública de eventos (agenda) del bar. Se muestra sobre el menú.
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { useEventos } from '../hooks/useEventos.js';

function fechaLegible(iso) {
  if (!iso) return null;
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' });
}

export default function EventosSection() {
  const eventos = useEventos();
  if (!eventos.length) return null;

  return (
    <section id="eventos" className="scroll-mt-32 max-w-7xl mx-auto px-3 md:px-8 py-10 md:py-16">
      <div className="mb-6 md:mb-10 flex items-end gap-3 md:gap-5">
        <span className="font-mono text-acid-400 text-sm md:text-base leading-none pb-1">[◈]</span>
        <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.85] text-bone">
          Agenda
        </h2>
        <div className="flex-1 h-0.5 bg-ink-600 mb-2 md:mb-3" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eventos.map((ev, i) => (
          <motion.article
            key={ev.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className={`group relative bg-ink-900 border-2 transition-all duration-200 hover:-translate-y-0.5 ${
              ev.destacado ? 'border-acid-400' : 'border-ink-600 hover:border-acid-400'
            }`}
          >
            {ev.video_url ? (
              <div className="relative aspect-video overflow-hidden bg-black border-b-2 border-ink-600">
                <video
                  src={ev.video_url}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={ev.imagen_url || undefined}
                />
              </div>
            ) : ev.imagen_url ? (
              <div className="relative aspect-video overflow-hidden bg-ink-800 border-b-2 border-ink-600">
                <img
                  src={ev.imagen_url}
                  alt={ev.titulo}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300"
                />
              </div>
            ) : null}
            <div className="p-5">
              <h3 className="font-display uppercase text-xl text-bone leading-[0.95] mb-2">{ev.titulo}</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-acid-400 mb-2">
                {ev.fecha && (
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" /> {fechaLegible(ev.fecha)}
                  </span>
                )}
                {ev.hora && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {ev.hora}
                  </span>
                )}
                {ev.lugar && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> {ev.lugar}
                  </span>
                )}
              </div>
              {ev.descripcion && (
                <p className="font-mono text-xs text-bone-muted leading-relaxed">{ev.descripcion}</p>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
