import { motion } from 'framer-motion';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { useConfig } from '../context/ConfigContext.jsx';
import { construirWhatsapp, BRAND } from '../config/defaults.js';

export default function ReservationButton() {
  const { config } = useConfig();
  if (!config.whatsapp) return null;
  return (
    <motion.a
      href={construirWhatsapp(config.whatsapp, BRAND)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.8 }}
      whileHover={{ x: -2, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-50
                 w-14 h-14 md:w-16 md:h-16 grid place-items-center
                 bg-[#25d366] text-ink-950 border-2 border-ink-950"
      style={{ boxShadow: '4px 4px 0 0 #000' }}
      aria-label="Reservar por WhatsApp"
      title="Reservar por WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </motion.a>
  );
}
