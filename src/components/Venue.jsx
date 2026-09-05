import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, ExternalLink, Navigation, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

export default function Venue({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  // Direct Google Maps URL for Grand Monarch Manor Colombo
  const googleMapsUrl = "https://maps.google.com/?q=Grand+Monarch+Manor+Sri+Jayawardenepura+Kotte+Colombo";

  return (
    <section id="venue" className="py-24 px-4 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.venueTitle}
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#2C3629] mb-4">
            {t.venueName}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5844] max-w-xl mx-auto">
            {t.venueSubtitle}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 glass-card rounded-3xl p-8 border border-[#D4B483]/30 flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl gold-gradient-bg flex items-center justify-center text-white mb-6 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-heading font-bold text-[#2C3629] mb-6">
                {t.venueName}
              </h3>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#F8E8E8] text-[#D4B483] mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">Address</h4>
                    <p className="text-sm text-[#2C3629] font-medium leading-relaxed mt-1">
                      {t.venueAddress}
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#F8E8E8] text-[#D4B483] mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">{t.venueTimeLabel}</h4>
                    <p className="text-sm text-[#2C3629] font-medium mt-1">
                      {t.venueTimeVal}
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#F8E8E8] text-[#D4B483] mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-gray-500 tracking-wider">{t.venueContactLabel}</h4>
                    <p className="text-sm text-[#2C3629] font-medium mt-1">
                      {t.venueContactVal}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Google Maps Action Button */}
            <div className="mt-10 pt-6 border-t border-[#D4B483]/20">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl gold-gradient-bg text-white font-medium shadow-lg hover:shadow-2xl transition-all"
              >
                <Navigation className="w-5 h-5" />
                <span className="font-semibold">{t.venueGoogleMapsBtn}</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-80" />
              </motion.a>
            </div>
          </motion.div>

          {/* Interactive Map Frame / Visual Preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-card rounded-3xl overflow-hidden border border-[#D4B483]/30 shadow-xl min-h-[380px] relative flex flex-col"
          >
            <iframe
              title="Grand Monarch Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.916053896593!2d79.9142167!3d6.8994799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae250a2ef56a59b%3A0xbefbe4910cf91730!2sGrand%20Monarch!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full flex-1"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
