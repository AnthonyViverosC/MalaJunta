// Cinta de texto en movimiento (ticker) — sello visual urbano de MALA JUNTA.
// Duplica el contenido para un desplazamiento continuo sin cortes.
export default function Marquee({
  items = ['MALA JUNTA', 'CÓCTELES DE AUTOR', 'LICORES SELECTOS', 'NOCHE SIN REGLAS'],
  variant = 'acid', // 'acid' | 'flame' | 'outline'
  speed = 'marquee',
}) {
  const base =
    variant === 'flame'
      ? 'bg-flame-500 text-white'
      : variant === 'outline'
      ? 'bg-ink-950 text-acid-400 border-y-2 border-acid-400'
      : 'bg-acid-400 text-ink-950';

  const fila = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden ${base} select-none`}>
      <div className={`marquee-track animate-${speed} py-2.5`}>
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {fila.map((t, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center font-display uppercase text-sm md:text-base tracking-[0.15em] px-6"
              >
                {t}
                <span className="ml-6 text-lg leading-none">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
