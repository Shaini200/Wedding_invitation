import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, Lock, Unlock, Calendar, Clock, MapPin, Shirt } from 'lucide-react';
import { translations } from '../data/translations';

export default function InvitationCard({ currentLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  return (
    <section id="invitation" className="py-20 md:py-32 px-4 relative overflow-hidden bg-[#FAF7F2]">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F8E8E8]/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A8B5A2]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.invitationTitle}
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#2C3629]">
            {t.invitationHeader}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5844] max-w-xl mx-auto font-sans">
            {t.invitationTapToOpen}
          </p>
        </motion.div>

        {/* Interactive Envelope Container */}
        <div className="perspective-1000 min-h-[460px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* Sealed Luxury Envelope State */
              <motion.div
                key="closed-envelope"
                initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotateY: 90 }}
                transition={{ duration: 0.6 }}
                onClick={() => setIsOpen(true)}
                className="cursor-pointer group relative w-full max-w-lg mx-auto bg-gradient-to-br from-[#FFFDF9] via-[#FAF7F2] to-[#F8E8E8] rounded-3xl p-8 sm:p-12 border-2 border-[#D4B483] shadow-2xl overflow-hidden hover:shadow-2xl transition-all"
              >
                {/* Envelope Flap & Wax Seal Decor */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#EFE8DC] to-transparent border-b border-[#D4B483]/30 flex justify-center items-center pointer-events-none" />

                {/* Ribbon lines */}
                <div className="absolute inset-x-0 top-1/2 h-10 -translate-y-1/2 bg-[#D4B483]/10 border-y border-[#D4B483]/30 pointer-events-none" />
                <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-[#D4B483]/10 border-x border-[#D4B483]/30 pointer-events-none" />

                {/* Gold Wax Seal Button */}
                <div className="relative z-10 my-8 flex flex-col items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-24 h-24 rounded-full gold-gradient-bg border-4 border-white shadow-xl flex flex-col items-center justify-center text-white relative shimmer-gold"
                  >
                    <Heart className="w-9 h-9 fill-white animate-pulse" />
                    <span className="text-[10px] font-bold tracking-tighter uppercase mt-0.5">TAP TO OPEN</span>
                  </motion.div>

                  <h3 className="text-2xl font-heading font-bold text-[#2C3629] mt-6">
                    {t.groomName} & {t.brideName}
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-[#D4B483] font-semibold mt-1">
                    {t.invitationCardFront}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#3E4A3A] font-medium group-hover:text-[#B89355] transition-colors">
                  <Mail className="w-4 h-4 text-[#D4B483]" />
                  <span>{t.invitationTapToOpen}</span>
                </div>
              </motion.div>
            ) : (
              /* Opened Luxury Card State */
              <motion.div
                key="open-card"
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-12 border-2 border-[#D4B483] shadow-2xl text-center overflow-hidden"
              >
                {/* Decorative Floral Ornaments */}
                <div className="absolute top-4 left-4 text-[#D4B483]/30 pointer-events-none">
                  <svg className="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M0,0 Q50,0 50,50 Q0,50 0,0 Z" />
                  </svg>
                </div>
                <div className="absolute bottom-4 right-4 text-[#D4B483]/30 pointer-events-none rotate-180">
                  <svg className="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M0,0 Q50,0 50,50 Q0,50 0,0 Z" />
                  </svg>
                </div>

                {/* Monogram Badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full gold-gradient-bg text-white font-heading font-bold text-xl shadow-md mb-6 shimmer-gold">
                  R & T
                </div>

                {/* Couple Title */}
                <h3 className="text-3xl sm:text-5xl font-heading font-bold gold-gradient-text mb-4">
                  {t.groomName} & {t.brideName}
                </h3>

                <p className="text-sm sm:text-base text-[#3E4A3A] font-sans leading-relaxed max-w-lg mx-auto mb-8">
                  {t.invitationMessage}
                </p>

                {/* Key Wedding Card Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto mb-8">
                  <div className="p-4 rounded-2xl bg-white/70 border border-[#D4B483]/30 flex items-start gap-3 shadow-sm">
                    <Calendar className="w-5 h-5 text-[#D4B483] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#3E4A3A]">Date</span>
                      <span className="block font-heading font-bold text-[#2C3629] text-base">{t.invitationDate}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-[#D4B483]/30 flex items-start gap-3 shadow-sm">
                    <Clock className="w-5 h-5 text-[#D4B483] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#3E4A3A]">Time</span>
                      <span className="block font-heading font-bold text-[#2C3629] text-base">{t.invitationTime}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-[#D4B483]/30 flex items-start gap-3 shadow-sm sm:col-span-2">
                    <MapPin className="w-5 h-5 text-[#D4B483] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#3E4A3A]">Venue</span>
                      <span className="block font-heading font-bold text-[#2C3629] text-base">{t.invitationVenue}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/70 border border-[#D4B483]/30 flex items-start gap-3 shadow-sm sm:col-span-2">
                    <Shirt className="w-5 h-5 text-[#D4B483] shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-[11px] uppercase tracking-wider font-semibold text-[#3E4A3A]">{t.invitationDressCodeTitle}</span>
                      <span className="block font-sans font-medium text-[#2C3629] text-sm">{t.invitationDressCodeDesc}</span>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 rounded-full border border-[#D4B483] bg-white text-[#2C3629] font-medium text-xs uppercase tracking-wider hover:bg-[#FAF7F2] transition-all"
                >
                  {t.invitationCloseBtn}
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
