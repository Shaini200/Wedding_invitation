import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronDown, Sparkles, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function Hero({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  // Target Wedding Date: October 24, 2026 09:30:00 AM
  const targetDate = new Date('2026-10-24T09:30:00').getTime();

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
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-[#2C3629]"
    >
      {/* Background Floral Overlay Image with Parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-1000 transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2000&q=80')`
        }}
      />

      {/* Dark & Gold Ambient Radial Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C3629] via-[#2C3629]/70 to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#D4B483]/15 blur-3xl pointer-events-none" />

      <div className="relative z-20 max-w-4xl mx-auto text-center text-white">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4B483]/40 text-[#D4B483] text-xs sm:text-sm font-medium tracking-widest uppercase mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#D4B483]" />
          <span>{t.heroGreeting}</span>
          <Sparkles className="w-4 h-4 text-[#D4B483]" />
        </motion.div>

        {/* Animated Bride & Groom Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl sm:text-7xl md:text-8xl font-heading font-bold tracking-tight text-white mb-4 drop-shadow-lg"
        >
          <span>{t.groomName}</span>
          <span className="block sm:inline sm:mx-4 font-serif text-3xl sm:text-5xl text-[#D4B483] italic">
            {t.andSign}
          </span>
          <span>{t.brideName}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-xl font-light text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed font-sans px-4"
        >
          {t.heroSubtitle}
        </motion.p>

        {/* Wedding Date Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#FAF7F2]/10 backdrop-blur-md border border-[#D4B483]/50 text-white mb-12 shadow-xl"
        >
          <Calendar className="w-5 h-5 text-[#D4B483]" />
          <span className="font-heading font-semibold text-lg sm:text-xl text-[#FAF7F2]">
            {t.weddingDateText}
          </span>
        </motion.div>

        {/* Live Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1 }}
          className="max-w-2xl mx-auto glass-card-dark rounded-3xl p-6 sm:p-8 border border-[#D4B483]/30 shadow-2xl mb-12"
        >
          <p className="text-xs uppercase tracking-widest text-[#D4B483] mb-6 font-semibold flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            {t.countdownHeading}
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-6">
            {[
              { label: t.countdownDays, value: timeLeft.days },
              { label: t.countdownHours, value: timeLeft.hours },
              { label: t.countdownMinutes, value: timeLeft.minutes },
              { label: t.countdownSeconds, value: timeLeft.seconds }
            ].map((unit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 sm:w-24 h-16 sm:h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl sm:text-4xl font-bold font-mono text-white shadow-inner">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <span className="text-[11px] sm:text-xs text-gray-300 uppercase tracking-wider mt-2 font-medium">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.a
          href="#invitation"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-xs uppercase tracking-widest text-[#D4B483]">Explore Invitation</span>
          <ChevronDown className="w-5 h-5 text-[#D4B483]" />
        </motion.a>
      </div>
    </section>
  );
}
