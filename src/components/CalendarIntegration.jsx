import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Sparkles, CheckCircle } from 'lucide-react';
import { translations } from '../data/translations';

export default function CalendarIntegration({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  const event = {
    title: "Kasun & Dinithi's Wedding Celebration",
    description: "Join us in celebrating the marriage of Kasun & Dinithi at Grand Monarch Manor, Colombo.",
    location: "Grand Monarch Manor, Sri Jayawardenepura Kotte, Colombo, Sri Lanka",
    startTime: "20261024T093000",
    endTime: "20261024T160000"
  };

  // Google Calendar Link generator
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${event.startTime}/${event.endTime}&details=${encodeURIComponent(
    event.description
  )}&location=${encodeURIComponent(event.location)}&sf=true&output=xml`;

  // Apple / iCal .ics File download generator
  const downloadIcsFile = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Kasun & Dinithi Wedding//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:20261024T040000Z
DTEND:20261024T103000Z
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT24H
ACTION:DISPLAY
DESCRIPTION:Reminder: Kasun & Dinithi's Wedding Tomorrow!
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Kasun_and_Dinithi_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="py-16 px-4 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border border-[#D4B483]/30 text-center shadow-xl relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-full gold-gradient-bg mx-auto flex items-center justify-center text-white mb-4 shadow-md shimmer-gold">
            <Calendar className="w-7 h-7" />
          </div>

          <h3 className="text-3xl font-heading font-bold text-[#2C3629] mb-2">
            {t.calendarTitle}
          </h3>
          <p className="text-sm text-[#4A5844] max-w-lg mx-auto mb-8">
            {t.calendarSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Google Calendar Button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-white border-2 border-[#D4B483] text-[#2C3629] font-medium shadow-md hover:bg-[#FAF7F2] hover:shadow-xl transition-all"
            >
              <Calendar className="w-5 h-5 text-[#D4B483]" />
              <span>{t.googleCalendarBtn}</span>
            </motion.a>

            {/* Apple Calendar Download Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={downloadIcsFile}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl gold-gradient-bg text-white font-medium shadow-md hover:shadow-xl transition-all"
            >
              <Download className="w-5 h-5" />
              <span>{t.appleCalendarBtn}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
