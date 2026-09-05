import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, Heart, ChevronDown } from 'lucide-react';
import { translations } from '../data/translations';

export default function HeroSection({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  // Target date: December 03, 2026 09:30:00 AM
  const targetDate = new Date('2026-12-03T09:30:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F8E8E8]/40 to-[#FAF7F2]"
    >
      {/* Background Floral Backdrop Graphic / Decorative Rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4B483]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#A8B5A2]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#F8E8E8]/80 rounded-full blur-2xl pointer-events-none" />

        {/* Decorative Luxury Floral Ring SVGs */}
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[800px] h-[650px] md:h-[800px] text-[#D4B483]/15 opacity-70 animate-spin-slow"
          viewBox="0 0 500 500"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="250" cy="250" r="230" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="250" cy="250" r="210" strokeWidth="1.5" />
          <circle cx="250" cy="250" r="190" strokeWidth="0.75" strokeDasharray="12 12" />
        </svg>
      </div>

      {/* Top Banner Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full glass-card border border-[#D4B483]/40 text-[#3E4A3A] text-xs md:text-sm font-medium uppercase tracking-widest shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-[#D4B483]" />
        <span>{t.heroGreeting}</span>
        <Sparkles className="w-4 h-4 text-[#D4B483]" />
      </motion.div>

      {/* Main Couple Names */}
      <div className="relative z-10 my-auto py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold tracking-tight text-[#2C3629] leading-none">
            <span className="gold-gradient-text block sm:inline">{t.groomName}</span>
            <span className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-[#D4B483] mx-4 inline-block my-2 sm:my-0">
              {t.andSign}
            </span>
            <span className="gold-gradient-text block sm:inline">{t.brideName}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl font-heading text-[#3E4A3A] italic max-w-2xl mx-auto pt-2 px-4 leading-relaxed">
            "{t.heroSubtitle}"
          </p>

          <div className="flex items-center justify-center gap-2 pt-4 text-[#3E4A3A]">
            <Calendar className="w-5 h-5 text-[#D4B483]" />
            <span className="font-heading font-semibold text-lg md:text-2xl tracking-wide border-b border-[#D4B483]/40 pb-0.5">
              {t.weddingDateText}
            </span>
          </div>
        </motion.div>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-widest text-[#3E4A3A] font-semibold mb-4 flex items-center justify-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.countdownHeading}
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {[
              { label: t.countdownDays, value: timeLeft.days },
              { label: t.countdownHours, value: timeLeft.hours },
              { label: t.countdownMinutes, value: timeLeft.minutes },
              { label: t.countdownSeconds, value: timeLeft.seconds }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ translateY: -4 }}
                className="glass-card rounded-2xl p-3 sm:p-4 md:p-5 border-2 border-[#D4B483]/30 text-center shadow-lg relative overflow-hidden group"
              >
                <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-[#D4B483]/10 rounded-full blur-md group-hover:scale-150 transition-transform" />
                <span className="block text-2xl sm:text-4xl md:text-5xl font-heading font-bold gold-gradient-text">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#3E4A3A] mt-1">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-10 pt-4"
      >
        <a
          href="#invitation"
          className="inline-flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-[#3E4A3A]/80 hover:text-[#B89355] transition-colors group"
        >
          <span>Scroll to Explore</span>
          <div className="w-8 h-8 rounded-full border border-[#D4B483] flex items-center justify-center group-hover:border-[#B89355] group-hover:bg-white/60 transition-all animate-bounce">
            <ChevronDown className="w-4 h-4 text-[#D4B483]" />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
