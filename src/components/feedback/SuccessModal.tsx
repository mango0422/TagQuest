'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/i18n';

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
  onNext: () => void;
  hasNext: boolean;
}

export default function SuccessModal({ isOpen, message, onNext, hasNext }: SuccessModalProps) {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="mx-4 max-w-md rounded-2xl border border-green-800 bg-slate-900 p-8 text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', damping: 15 }}
              className="mb-4 text-5xl"
            >
              ✓
            </motion.div>
            <h3 className="mb-3 text-xl font-bold text-green-400">
              {t('common.correct')}
            </h3>
            <p className="mb-6 leading-relaxed text-slate-300">
              {message}
            </p>
            <button
              onClick={onNext}
              className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-green-500"
            >
              {hasNext ? t('common.nextLevel') : t('common.trackComplete')}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
