import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Calendar, Clock, MapPin, Sparkles, Check, Shirt } from 'lucide-react';
import { translations } from '../data/translations';

export default function AnimatedInvitation({ currentLang }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  return (
    <section id="invitation" className="py-24 px-4 bg-[#FAF7F2] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F8E8E8]/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.invitationTitle}
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#2C3629] mb-4">
            {t.invitationCardFront}
          </h2>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full" />
        </motion.div>

        {/* 3D Envelope / Card Flip Container */}
        <div className="perspective-1000 max-w-2xl mx-auto min-h-[480px] flex items-center justify-center">
          {!isOpen ? (
            /* CLOSED ENVELOPE CARD */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
              onClick={() => setIsOpen(true)}
              className="cursor-pointer w-full glass-card rounded-3xl p-8 sm:p-12 border-2 border-[#D4B483]/60 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center group"
            >
              {/* Envelope Flap Accent */}
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#F8E8E8] to-transparent opacity-60 rounded-t-3xl" />

              {/* Gold Wax Seal Monogram */}
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-20 h-20 rounded-full gold-gradient-bg border-4 border-white shadow-xl flex items-center justify-center text-white mb-6 relative z-10 shimmer-gold"
              >
                <Heart className="w-10 h-10 fill-white/80" />
              </motion.div>

              <h3 className="text-3xl font-heading font-bold text-[#2C3629] mb-2">
                Kasun & Dinithi
              </h3>
              <p className="text-sm text-[#4A5844] mb-6 font-medium">
                {t.invitationDate} • {t.invitationVenue}
              </p>

              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full gold-gradient-bg text-white font-medium shadow-lg group-hover:shadow-2xl transition-all">
                <Mail className="w-4 h-4 animate-bounce" />
                <span>{t.invitationTapToOpen}</span>
              </div>
            </motion.div>
          ) : (
            /* OPENED INVITATION DETAILS CARD */
            <motion.div
              key="opened-invitation"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full glass-gold rounded-3xl p-8 sm:p-12 border-2 border-[#D4B483] shadow-2xl text-center relative"
            >
              {/* Decorative Corner Filigree */}
              <div className="absolute top-4 left-4 text-[#D4B483] text-2xl font-serif">❦</div>
              <div className="absolute top-4 right-4 text-[#D4B483] text-2xl font-serif">❦</div>
              <div className="absolute bottom-4 left-4 text-[#D4B483] text-2xl font-serif">❦</div>
              <div className="absolute bottom-4 right-4 text-[#D4B483] text-2xl font-serif">❦</div>

              <div className="text-xs uppercase tracking-widest text-[#B89355] font-semibold mb-2">
                {t.invitationHeader}
              </div>

              <h3 className="text-4xl sm:text-5xl font-heading font-bold text-[#2C3629] mb-4">
                Kasun & Dinithi
              </h3>

              <p className="text-sm sm:text-base text-[#3E4A3A] font-light max-w-lg mx-auto mb-8 leading-relaxed italic">
                "{t.invitationMessage}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto mb-8 text-left">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-[#D4B483]/30">
                  <Calendar className="w-5 h-5 text-[#D4B483] mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-gray-500 font-semibold">Date</span>
                    <span className="text-sm font-semibold text-[#2C3629]">{t.invitationDate}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-[#D4B483]/30">
                  <Clock className="w-5 h-5 text-[#D4B483] mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-gray-500 font-semibold">Time</span>
                    <span className="text-sm font-semibold text-[#2C3629]">{t.invitationTime}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-[#D4B483]/30 sm:col-span-2">
                  <MapPin className="w-5 h-5 text-[#D4B483] mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-gray-500 font-semibold">Venue</span>
                    <span className="text-sm font-semibold text-[#2C3629]">{t.invitationVenue}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-[#D4B483]/30 sm:col-span-2">
                  <Shirt className="w-5 h-5 text-[#D4B483] mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase text-gray-500 font-semibold">{t.invitationDressCodeTitle}</span>
                    <span className="text-sm font-semibold text-[#2C3629]">{t.invitationDressCodeDesc}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-xs uppercase tracking-wider text-[#3E4A3A] underline hover:text-[#B89355] transition-colors"
              >
                {t.invitationCloseBtn}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
