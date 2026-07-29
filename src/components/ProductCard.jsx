import { memo, useState } from 'react';
import { Star } from 'lucide-react';
import BottlePlaceholder from './BottlePlaceholder.jsx';
import { formatearPrecio } from '../data/menu.js';

function ProductCard({ producto, index = 0 }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = producto.imagen && !imgError;
  const esCoctel = producto.categoria === 'cocteles';
  const agotado = producto.disponible === false;

  const tipoPlaceholder =
    producto.categoria === 'cervezas'
      ? 'lata'
      : producto.categoria === 'otros'
      ? producto.nombre.toLowerCase().includes('agua')
        ? 'botella'
        : 'lata'
      : 'botella';

  return (
    <article
      className="group relative bg-ink-900 border-2 border-ink-600 hover:border-acid-400
                 transition-colors duration-200"
    >
      {/* Ribbon destacado */}
      {producto.destacado && (
        <span className="absolute -top-px -left-px z-20 flex items-center gap-1 bg-flame-500 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-1">
          <Star className="h-3 w-3 fill-white" /> Top
        </span>
      )}

      {/* media */}
      <div
        className={`relative aspect-[4/5] overflow-hidden border-b-2 border-ink-600 ${
          esCoctel ? 'bg-ink-800' : 'bg-bone'
        }`}
      >
        {hasImage ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.04] ${
              esCoctel ? 'object-cover' : 'object-contain p-2'
            } ${agotado ? 'grayscale opacity-50' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-6 bg-ink-800">
            <BottlePlaceholder
              nombre={producto.nombre}
              color={producto.color || '#26262e'}
              tipo={tipoPlaceholder}
            />
          </div>
        )}

        {/* Sello AGOTADO */}
        {agotado && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="rotate-[-8deg] border-2 border-flame-500 text-flame-500 font-display uppercase text-lg md:text-2xl px-3 py-1 bg-ink-950/70">
              Agotado
            </span>
          </div>
        )}
      </div>

      {/* info */}
      <div className="p-3 md:p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display uppercase text-sm xs:text-base md:text-xl text-bone leading-[0.95] break-words min-w-0">
            {producto.nombre}
          </h3>
          {producto.precio != null && producto.precio !== '' && (
            <span className="shrink-0 -mt-1 -mr-1 bg-acid-400 text-ink-950 font-display text-xs xs:text-sm md:text-base px-2 py-0.5 rotate-2 group-hover:rotate-0 transition-transform">
              {formatearPrecio(producto.precio)}
            </span>
          )}
        </div>
        {producto.descripcion && (
          <p className="mt-2 font-mono text-[10px] xs:text-[11px] md:text-xs text-bone-muted leading-relaxed line-clamp-3">
            {producto.descripcion}
          </p>
        )}
      </div>
    </article>
  );
}

export default memo(ProductCard);
