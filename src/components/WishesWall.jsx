import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, Sparkles, Send, Quote } from 'lucide-react';
import { translations } from '../data/translations';

export default function WishesWall({ currentLang, wishes, onAddWish }) {
  const t = translations[currentLang] || translations.en;

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onAddWish({
      name: name.trim(),
      message: message.trim()
    });

    setName('');
    setMessage('');
  };

  return (
    <section id="wishes" className="py-20 md:py-32 px-4 relative overflow-hidden bg-[#FAF7F2]">
      {/* Background Decor */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#F8E8E8]/70 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest">
            <MessageCircle className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.navWishes}
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#2C3629]">
            {t.wishesTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5844] max-w-xl mx-auto font-sans">
            {t.wishesSubtitle}
          </p>
        </motion.div>

        {/* Post New Wish Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#D4B483]/40 shadow-xl mb-16"
        >
          <h3 className="text-xl font-heading font-bold text-[#2C3629] mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4B483]" />
            {t.wishesAddTitle}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.wishesNamePlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#D4B483]/40 focus:border-[#D4B483] focus:outline-none text-[#2C3629] text-sm shadow-sm transition-all"
            />

            <textarea
              required
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.wishesMessagePlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-white/80 border border-[#D4B483]/40 focus:border-[#D4B483] focus:outline-none text-[#2C3629] text-sm shadow-sm transition-all"
            ></textarea>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-2xl gold-gradient-bg text-white font-semibold text-sm shadow-md flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{t.wishesPostBtn}</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Wishes Grid Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishes.map((wish, idx) => (
              <motion.div
                key={wish.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (idx % 6) * 0.1 }}
                className="glass-card rounded-3xl p-6 border border-[#D4B483]/30 shadow-lg relative flex flex-col justify-between hover:shadow-xl transition-shadow"
              >
                <Quote className="w-8 h-8 text-[#D4B483]/30 absolute top-4 right-4 pointer-events-none" />

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full gold-gradient-bg text-white font-bold text-xs flex items-center justify-center shadow-sm">
                      {wish.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-[#2C3629] text-base leading-tight">
                        {wish.name}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-sans block">
                        {wish.date || "Wedding Guest"}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#4A5844] font-sans leading-relaxed italic">
                    "{wish.message}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4B483]/20 flex items-center justify-between text-xs text-[#D4B483]">
                  <span className="inline-flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#D4B483]" />
                    <span>With Blessings</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
