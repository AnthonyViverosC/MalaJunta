import { Instagram, MapPin, Phone, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { useConfig } from '../context/ConfigContext.jsx';
import { construirWhatsapp, construirMapa, BRAND, BRAND_LOGO } from '../config/defaults.js';

export default function Footer() {
  const { config } = useConfig();
  const telLimpio = (config.telefonos || '').replace(/\s/g, '');

  return (
    <footer className="relative mt-16 border-t-2 border-acid-400 bg-ink-950">
      {/* Wordmark gigante de cierre */}
      <div className="max-w-7xl mx-auto px-5 pt-12">
        <p className="font-display uppercase text-[16vw] md:text-[9rem] leading-[0.8] text-ink-700 select-none">
          {BRAND}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-8 md:gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid-400 mb-3">Identidad</p>
          <div className="flex items-center gap-3">
            <span className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-acid-400/60 shrink-0">
              <img src={config.logo_url || BRAND_LOGO} alt={BRAND} className="w-full h-full object-cover" />
            </span>
            <div>
              <p className="font-display uppercase text-2xl text-bone leading-none">{BRAND}</p>
              <p className="font-mono text-sm text-bone-muted mt-1">{config.eslogan}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid-400 mb-3">Visítanos</p>
          <ul className="space-y-3">
            {config.direccion && (
              <li>
                <a
                  href={construirMapa(config)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-bone hover:text-acid-400 transition font-mono text-sm"
                >
                  <MapPin size={16} className="mt-0.5 text-acid-400 shrink-0" />
                  <span>
                    {config.direccion}
                    {config.barrio && (
                      <>
                        <br />
                        <span className="text-bone-muted text-xs uppercase tracking-wider">
                          {config.barrio}
                        </span>
                      </>
                    )}
                  </span>
                </a>
              </li>
            )}
            {config.telefonos && (
              <li>
                <a
                  href={`tel:${telLimpio}`}
                  className="flex items-center gap-2 text-bone hover:text-acid-400 transition font-mono text-sm"
                >
                  <Phone size={16} className="text-acid-400 shrink-0" />
                  <span>{config.telefonos}</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-acid-400 mb-3">Reservas y redes</p>
          <div className="flex items-center gap-3">
            {config.whatsapp && (
              <a
                href={construirWhatsapp(config.whatsapp, BRAND)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reservar por WhatsApp"
                className="w-11 h-11 grid place-items-center bg-[#25d366] text-ink-950 border-2 border-[#25d366] hover:-translate-y-0.5 transition-transform"
                style={{ boxShadow: '3px 3px 0 0 #000' }}
              >
                <WhatsAppIcon size={20} />
              </a>
            )}
            {config.redes?.instagram && (
              <a
                href={config.redes.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 grid place-items-center border-2 border-ink-600 text-bone hover:border-acid-400 hover:text-acid-400 transition"
              >
                <Instagram size={20} />
              </a>
            )}
          </div>
          {config.info_contacto && (
            <p className="mt-4 font-mono text-[11px] text-bone-muted leading-relaxed">
              {config.info_contacto}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-ink-700 py-5 px-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-mono text-[11px] uppercase tracking-wider text-bone-muted">
        <span>© {new Date().getFullYear()} {BRAND}</span>
        <span className="hidden sm:inline text-ink-600">/</span>
        <Link
          to="/admin"
          className="inline-flex items-center gap-1.5 hover:text-acid-400 transition"
        >
          <Lock size={12} /> Acceso administrador
        </Link>
      </div>
    </footer>
  );
}
