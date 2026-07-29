import { useEffect, useRef, useState } from 'react';

export default function CategoryTabs({ categorias, activa, setActiva, onSpy }) {
  const [sticky, setSticky] = useState(false);
  const ref = useRef(null);
  const tabsScrollRef = useRef(null);

  // Sticky visual
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      setSticky(rect.top <= 72);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy con IntersectionObserver — detecta qué sección está a la vista
  useEffect(() => {
    if (!onSpy) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibles = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibles[0]) onSpy(visibles[0].target.id);
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );
    categorias.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categorias, onSpy]);

  // Auto-scroll de la barra para mantener visible la pestaña activa (móvil)
  useEffect(() => {
    const container = tabsScrollRef.current;
    if (!container) return;
    const btn = container.querySelector(`[data-cat="${activa}"]`);
    if (!btn) return;
    const cRect = container.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    if (bRect.left < cRect.left || bRect.right > cRect.right) {
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activa]);

  return (
    <div
      ref={ref}
      className={[
        'sticky top-16 md:top-[70px] z-30 transition-all duration-300',
        sticky ? 'bg-ink-950/95 backdrop-blur-md border-b-2 border-ink-700' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto py-3">
        <div
          ref={tabsScrollRef}
          className="flex gap-2 overflow-x-auto hide-scrollbar px-3 md:px-6 scroll-smooth"
        >
          {categorias.map((cat) => {
            const isActive = activa === cat.id;
            return (
              <button
                key={cat.id}
                data-cat={cat.id}
                onClick={() => setActiva(cat.id)}
                className={[
                  'whitespace-nowrap px-4 md:px-5 py-2 font-display uppercase text-sm md:text-base tracking-wide shrink-0 border-2 transition-all duration-150',
                  isActive
                    ? 'bg-acid-400 text-ink-950 border-acid-400 shadow-hard'
                    : 'bg-transparent text-bone-muted border-ink-600 hover:text-bone hover:border-bone/40',
                ].join(' ')}
              >
                <span className="flex items-center gap-1.5">
                  {cat.icono && <span aria-hidden>{cat.icono}</span>}
                  {cat.nombre}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
