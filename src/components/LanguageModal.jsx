import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Globe } from 'lucide-react';

export default function LanguageModal({ isOpen, onSelectLanguage }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3629]/60 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-lg overflow-hidden glass-card rounded-3xl p-8 md:p-12 text-center border-2 border-[#D4B483]/40 shadow-2xl"
        >
          {/* Subtle Corner Flowers Decorative SVGs */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none opacity-20 text-[#D4B483]">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 C30,10 50,30 50,60 C30,40 10,30 0,0 Z" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none opacity-20 text-[#D4B483] transform rotate-180">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 C30,10 50,30 50,60 C30,40 10,30 0,0 Z" />
            </svg>
          </div>

          {/* Floating Monogram */}
          <div className="mx-auto w-16 h-16 rounded-full gold-gradient-bg flex items-center justify-center text-white shadow-lg mb-6 shimmer-gold">
            <Heart className="w-8 h-8 fill-white/80 animate-pulse" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            Rajitha & Tharusha's Wedding
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-bold text-[#2C3629] mb-2 leading-tight">
            Please Select Your Language
          </h2>
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-[#3E4A3A] mb-4 leading-relaxed">
            කරුණාකර ඔබගේ භාෂාව තෝරන්න
          </h3>

          <p className="text-xs md:text-sm text-[#4A5844] mb-8 font-sans">
            Choose your language to view the wedding invitation details.
            <br />
            ඉදිරියට යාම සඳහා ඔබ කැමති භාෂාව තෝරන්න.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* English Button */}
            <motion.button
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectLanguage('en')}
              className="group relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white border-2 border-[#D4B483] text-[#2C3629] font-medium shadow-md hover:shadow-xl hover:bg-[#FAF7F2] transition-all duration-300"
            >
              <span className="text-2xl">🇬🇧</span>
              <div className="text-left">
                <span className="block font-semibold text-base group-hover:text-[#B89355]">English</span>
                <span className="block text-[10px] text-gray-500">English Language</span>
              </div>
            </motion.button>

            {/* Sinhala Button */}
            <motion.button
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectLanguage('si')}
              className="group relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl gold-gradient-bg text-white font-medium shadow-md hover:shadow-xl transition-all duration-300"
            >
              <span className="text-2xl">🇱🇰</span>
              <div className="text-left">
                <span className="block font-semibold text-base font-si">සිංහල</span>
                <span className="block text-[10px] text-white/80">Sinhala Language</span>
              </div>
            </motion.button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <Globe className="w-3.5 h-3.5" />
            <span>Language can be changed anytime from the top bar</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
