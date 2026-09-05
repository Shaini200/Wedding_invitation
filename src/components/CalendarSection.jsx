import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';
import { translations } from '../data/translations';

export default function CalendarSection({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  const googleCalendarUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Rajitha+%26+Tharusha%27s+Wedding&dates=20261203T040000Z/20261203T103000Z&details=Join+us+for+the+wedding+celebration+of+Rajitha+%26+Tharusha+at+Moon+Light+Hotel,+Marawila.&location=Moon+Light+Hotel,+Marawila,+Sri+Lanka";

  const handleDownloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Rajitha & Tharusha Wedding//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:Rajitha & Tharusha's Wedding Celebration
DESCRIPTION:We invite you to share in our special wedding day. Poruwa ceremony followed by reception.
LOCATION:Moon Light Hotel, Marawila, Sri Lanka
DTSTART:20261203T040000Z
DTEND:20261203T103000Z
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Rajitha_and_Tharusha_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-[#FAF7F2] via-[#F8E8E8]/40 to-[#FAF7F2]">
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 sm:p-12 border-2 border-[#D4B483]/40 shadow-xl text-center relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4B483]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-full gold-gradient-bg mx-auto flex items-center justify-center text-white shadow-md mb-4 shimmer-gold">
            <Calendar className="w-7 h-7" />
          </div>

          <h3 className="text-2xl sm:text-4xl font-heading font-bold text-[#2C3629] mb-3">
            {t.calendarTitle}
          </h3>

          <p className="text-xs sm:text-sm text-[#4A5844] max-w-lg mx-auto font-sans mb-8">
            {t.calendarSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Google Calendar Button */}
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl gold-gradient-bg text-white font-semibold text-sm shadow-md hover:shadow-xl transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>{t.googleCalendarBtn}</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </motion.a>

            {/* Apple Calendar Download Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleDownloadICS}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white border-2 border-[#D4B483] text-[#2C3629] font-semibold text-sm shadow-md hover:shadow-xl hover:bg-[#FAF7F2] transition-all"
            >
              <Download className="w-5 h-5 text-[#D4B483]" />
              <span>{t.appleCalendarBtn}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
