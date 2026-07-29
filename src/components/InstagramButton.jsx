import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useConfig } from '../context/ConfigContext.jsx';

export default function InstagramButton() {
  const { config } = useConfig();
  const instagram = config.redes?.instagram;
  if (!instagram) return null;
  return (
    <motion.a
      href={instagram}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.95 }}
      whileHover={{ x: -2, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50
                 w-14 h-14 md:w-16 md:h-16 grid place-items-center
                 bg-acid-400 text-ink-950 border-2 border-ink-950"
      style={{ boxShadow: '4px 4px 0 0 #000' }}
      aria-label="Instagram MALA JUNTA"
    >
      <Instagram size={26} />
    </motion.a>
  );
}
