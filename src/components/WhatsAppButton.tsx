import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';

export function WhatsAppButton() {
  const { settings } = useSettings();
  const [open, setOpen] = useState(false);
  const number = settings.whatsapp_number.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 left-0 w-72 rounded-2xl glass-strong shadow-soft-lg p-4"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display font-semibold text-navy-900">Chat with us</h3>
              <button onClick={() => setOpen(false)} className="text-navy-400 hover:text-navy-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-navy-500 mb-3">
              Have a question? Message us on WhatsApp and we'll respond quickly.
            </p>
            <a
              href={`https://wa.me/${number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-emerald w-full"
            >
              <MessageCircle className="h-4 w-4" />
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-soft-lg hover:bg-emerald-600 transition"
        aria-label="WhatsApp support"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-7 w-7" />}
      </motion.button>
    </div>
  );
}
