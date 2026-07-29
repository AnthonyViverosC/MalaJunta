import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import SearchBar from './SearchBar.jsx';
import { useConfig } from '../context/ConfigContext.jsx';
import { BRAND, BRAND_LOGO } from '../config/defaults.js';

export default function Navbar({ busqueda, setBusqueda }) {
  const { config } = useConfig();
  const logo = config.logo_url || BRAND_LOGO;
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={[
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-ink-950/95 backdrop-blur-md border-b-2 border-acid-400'
          : 'bg-transparent border-b-2 border-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-3 md:px-6 h-16 md:h-[70px] flex items-center justify-between gap-2 md:gap-4">
        <a href="#top" className="flex items-center gap-3 group min-w-0">
          {/* Emblema con el logo */}
          <span className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-acid-400/70 shrink-0 shadow-[0_0_18px_rgba(229,185,106,0.35)]">
            <img
              src={logo}
              alt={BRAND}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </span>
          <span className="font-display uppercase text-lg md:text-2xl tracking-wide text-bone truncate leading-none">
            {BRAND}
          </span>
        </a>

        <div className="hidden md:block flex-1 max-w-sm">
          <SearchBar value={busqueda} onChange={setBusqueda} />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="#carta"
            className="hidden md:inline-flex font-display uppercase text-xs tracking-wider text-ink-950 bg-acid-400 px-4 py-2 border-2 border-acid-400 shadow-hard hover:bg-flame-500 hover:border-flame-500 hover:text-white transition-colors"
          >
            La carta
          </a>
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="md:hidden w-10 h-10 grid place-items-center border-2 border-ink-600 text-bone hover:border-acid-400 hover:text-acid-400 transition"
            aria-label="Buscar"
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden px-3 pb-3 overflow-hidden bg-ink-950/95"
          >
            <SearchBar value={busqueda} onChange={setBusqueda} autoFocus />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
