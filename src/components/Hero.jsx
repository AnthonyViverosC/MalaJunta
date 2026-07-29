import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { useConfig } from '../context/ConfigContext.jsx';
import { construirWhatsapp, BRAND, BRAND_TAGLINE, BRAND_LOGO } from '../config/defaults.js';

export default function Hero() {
  const { config } = useConfig();
  const logo = config.logo_url || BRAND_LOGO;

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Fondo: portada muy oscurecida + retícula + tinte */}
      <div className="absolute inset-0 z-0">
        {config.portada_url && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${config.portada_url}")`,
              filter: 'grayscale(0.35) brightness(0.3) contrast(1.1) sepia(0.25)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-grid-faint [background-size:44px_44px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/45 to-ink-950" />
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-20 bg-acid-500" />
        <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full blur-3xl opacity-15 bg-flame-500" />
      </div>

      {/* Cinta diagonal decorativa */}
      <div className="pointer-events-none absolute top-28 -right-24 rotate-[8deg] z-10 hidden sm:block">
        <div className="bg-tape h-9 w-[140vw] opacity-80" />
      </div>

      {/* Contenido */}
      <div className="relative z-20 max-w-6xl mx-auto px-5 w-full flex flex-col items-center text-center">
        {/* ── Emblema con el logo ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-40 h-40 xs:w-48 xs:h-48 md:w-60 md:h-60 mb-6"
        >
          {/* Halo dorado */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-acid-500/40 animate-halo" />
          {/* Anillo cónico giratorio */}
          <div
            className="absolute -inset-2 rounded-full animate-spin-slow"
            style={{
              background:
                'conic-gradient(from 0deg, #f2dca0, #b8843a, #e5b96a, #8c5e2e, #f2dca0)',
              filter: 'blur(3px)',
              opacity: 0.8,
            }}
          />
          {/* Aro nítido */}
          <div className="absolute -inset-0.5 rounded-full ring-2 ring-acid-400/70" />
          {/* Logo */}
          <div className="absolute inset-1 rounded-full overflow-hidden ring-1 ring-black/40 shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]">
            <img src={logo} alt={`${BRAND} — logo`} className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-[11px] xs:text-xs uppercase tracking-[0.4em] text-acid-400 mb-3 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-acid-400" />
          Carta digital · Bar
          <span className="inline-block w-8 h-px bg-acid-400" />
        </motion.p>

        {/* Wordmark */}
        <h1 className="font-display uppercase leading-[0.82] text-bone">
          <motion.span
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[17vw] sm:text-[13vw] md:text-[9rem] gradient-text"
          >
            {BRAND.split(' ')[0] || 'MALA'}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[17vw] sm:text-[13vw] md:text-[9rem] text-stroke"
          >
            {BRAND.split(' ')[1] || 'JUNTA'}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-4 font-mono text-sm md:text-base text-bone-muted max-w-md leading-relaxed"
        >
          {config.eslogan || BRAND_TAGLINE}. Cócteles de autor, licores selectos
          y noches que no se cuentan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-8 flex flex-col xs:flex-row gap-3"
        >
          <a href="#carta" className="btn-acid animate-glow">
            Ver la carta
          </a>
          <a
            href={construirWhatsapp(config.whatsapp, BRAND)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3
                       bg-[#25d366] text-ink-950 font-display uppercase tracking-wider text-sm
                       border-2 border-[#25d366] transition-all duration-150
                       hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ boxShadow: '4px 4px 0 0 #000' }}
          >
            <WhatsAppIcon size={18} />
            Reservar
          </a>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-acid-400"
      >
        <ChevronDown size={26} />
      </motion.div>
    </section>
  );
}
