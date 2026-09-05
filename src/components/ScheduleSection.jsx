import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Camera, Utensils, PartyPopper, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function ScheduleSection({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  const events = [
    {
      icon: Heart,
      title: t.ceremonyTitle,
      time: t.ceremonyTime,
      desc: t.ceremonyDesc,
      tag: "09:30 AM",
      badge: "💍 Ceremony"
    },
    {
      icon: Camera,
      title: t.photoshootTitle,
      time: t.photoshootTime,
      desc: t.photoshootDesc,
      tag: "11:00 AM",
      badge: "📸 Photoshoot"
    },
    {
      icon: Utensils,
      title: t.receptionTitle,
      time: t.receptionTime,
      desc: t.receptionDesc,
      tag: "12:30 PM",
      badge: "🍽 Reception"
    },
    {
      icon: PartyPopper,
      title: t.celebrationTitle,
      time: t.celebrationTime,
      desc: t.celebrationDesc,
      tag: "02:30 PM",
      badge: "🎉 Celebration"
    }
  ];

  return (
    <section id="schedule" className="py-20 md:py-32 px-4 relative overflow-hidden bg-[#FAF7F2]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F8E8E8]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.navSchedule}
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#2C3629]">
            {t.scheduleTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5844] max-w-xl mx-auto font-sans">
            {t.scheduleSubtitle}
          </p>
        </motion.div>

        {/* Timeline Items Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4B483]/20 via-[#D4B483] to-[#D4B483]/20 sm:-translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {events.map((evt, idx) => {
              const IconComp = evt.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: idx * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Icon Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 z-20 w-12 h-12 rounded-full gold-gradient-bg text-white flex items-center justify-center shadow-lg border-4 border-[#FAF7F2] shimmer-gold">
                    <IconComp className="w-6 h-6" />
                  </div>

                  {/* Timeline Card Container */}
                  <div className={`w-full sm:w-1/2 pl-16 sm:pl-0 ${isEven ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02, translateY: -3 }}
                      className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#D4B483]/40 shadow-xl relative overflow-hidden group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-[#D4B483]/15 text-[#B89355] font-bold text-xs">
                          {evt.badge}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#3E4A3A] flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#D4B483]" />
                          {evt.time}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#2C3629] mb-2">
                        {evt.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#4A5844] font-sans leading-relaxed">
                        {evt.desc}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
