import { motion } from 'framer-motion';
import ProductCard from './ProductCard.jsx';

export default function MenuSection({ categoria, productos, indice = 0 }) {
  if (!productos.length) return null;

  const num = String(indice + 1).padStart(2, '0');

  return (
    <section
      id={categoria.id}
      className="scroll-mt-32 max-w-7xl mx-auto px-3 md:px-8 py-10 md:py-16"
    >
      {/* Encabezado de sección: número índice + nombre, alineado a la izquierda */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4 }}
        className="mb-6 md:mb-10 flex items-end gap-3 md:gap-5"
      >
        <span className="font-mono text-acid-400 text-sm md:text-base leading-none pb-1">
          [{num}]
        </span>
        <h2 className="font-display uppercase text-4xl md:text-6xl leading-[0.85] text-bone flex items-center gap-3">
          {categoria.icono && <span aria-hidden className="text-3xl md:text-5xl">{categoria.icono}</span>}
          {categoria.nombre}
        </h2>
        <div className="flex-1 h-0.5 bg-ink-600 mb-2 md:mb-3" />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        {productos.map((producto, i) => (
          <ProductCard key={producto.id} producto={producto} index={i} />
        ))}
      </div>
    </section>
  );
}
