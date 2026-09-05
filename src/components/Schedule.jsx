import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Camera, Utensils, PartyPopper, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function Schedule({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  const timelineEvents = [
    {
      icon: "💍",
      LucideIcon: Heart,
      time: t.ceremonyTime,
      title: t.ceremonyTitle,
      desc: t.ceremonyDesc,
      bg: "bg-[#F8E8E8]",
      border: "border-[#D4B483]"
    },
    {
      icon: "📸",
      LucideIcon: Camera,
      time: t.photoshootTime,
      title: t.photoshootTitle,
      desc: t.photoshootDesc,
      bg: "bg-[#FAF7F2]",
      border: "border-[#A8B5A2]"
    },
    {
      icon: "🍽",
      LucideIcon: Utensils,
      time: t.receptionTime,
      title: t.receptionTitle,
      desc: t.receptionDesc,
      bg: "bg-[#F8E8E8]",
      border: "border-[#D4B483]"
    },
    {
      icon: "🎉",
      LucideIcon: PartyPopper,
      time: t.celebrationTime,
      title: t.celebrationTitle,
      desc: t.celebrationDesc,
      bg: "bg-[#FAF7F2]",
      border: "border-[#A8B5A2]"
    }
  ];

  return (
    <section id="schedule" className="py-24 px-4 bg-gradient-to-b from-[#FAF7F2] to-[#F8E8E8]/40 relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.scheduleTitle}
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#2C3629] mb-4">
            {t.scheduleSubtitle}
          </h2>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-1 gold-gradient-bg -translate-x-1/2 rounded-full hidden sm:block opacity-40" />

          <div className="space-y-12 sm:space-y-16">
            {timelineEvents.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Card */}
                  <div className="w-full sm:w-1/2 sm:px-8">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`glass-card rounded-3xl p-6 sm:p-8 border-2 ${item.border} shadow-xl relative overflow-hidden`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="px-3 py-1 rounded-full bg-[#D4B483]/20 text-[#3E4A3A] text-xs font-mono font-bold">
                          {item.time}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#2C3629] mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-[#4A5844] leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Center Node Badge */}
                  <div className="my-4 sm:my-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 w-12 h-12 rounded-full gold-gradient-bg border-4 border-white shadow-lg flex items-center justify-center text-white z-10">
                    <item.LucideIcon className="w-5 h-5" />
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
