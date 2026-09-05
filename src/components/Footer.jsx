import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp, Share2, Globe, MessageCircle } from 'lucide-react';
import { translations } from '../data/translations';

export default function Footer({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#2C3629] text-white pt-20 pb-12 px-4 border-t-2 border-[#D4B483]/40 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#D4B483]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
        {/* Animated Heart Badge */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full gold-gradient-bg mx-auto flex items-center justify-center text-white shadow-xl shimmer-gold"
        >
          <Heart className="w-8 h-8 fill-white" />
        </motion.div>

        {/* Thank you title */}
        <div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold gold-gradient-text mb-3">
            {t.footerThankYou}
          </h2>
          <p className="text-sm text-gray-300 font-sans max-w-md mx-auto">
            {t.footerSubtext}
          </p>
        </div>

        {/* Monogram */}
        <div className="font-heading font-bold text-3xl tracking-widest text-[#D4B483]">
          R & T
        </div>

        {/* Social Media Share Actions */}
        <div className="flex items-center justify-center gap-4 pt-2">
          {[
            { icon: Globe, href: "#", label: "Website" },
            { icon: MessageCircle, href: "#", label: "WhatsApp" },
            { icon: Share2, href: "#", label: "Share" }
          ].map((social, idx) => {
            const IconComp = social.icon;
            return (
              <motion.a
                key={idx}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href={social.href}
                aria-label={social.label}
                className="w-11 h-11 rounded-full bg-white/10 border border-[#D4B483]/30 flex items-center justify-center text-[#D4B483] hover:bg-[#D4B483] hover:text-white transition-all shadow-md"
              >
                <IconComp className="w-5 h-5" />
              </motion.a>
            );
          })}
        </div>

        {/* Back To Top Button */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-sans">
          <span>© 2026 Rajitha & Tharusha's Wedding. All Rights Reserved.</span>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#D4B483] transition-all border border-[#D4B483]/30"
          >
            <span>{t.footerBackToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
