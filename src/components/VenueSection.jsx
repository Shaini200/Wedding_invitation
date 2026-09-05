import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, ExternalLink, Sparkles } from 'lucide-react';
import { translations } from '../data/translations';

export default function VenueSection({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  const googleMapsUrl = "https://www.google.com/maps/place/Moon+Light+Hotel/@7.4152353,79.8464321,17z/data=!4m9!3m8!1s0x3ae2c40cf5ec3e43:0xd1b5b163dbbed501!5m2!4m1!1i2!8m2!3d7.4152353!4d79.849007!16s%2Fg%2F1pp2vbdc4?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D";

  return (
    <section id="venue" className="py-20 md:py-32 px-4 relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F8E8E8]/30 to-[#FAF7F2]">
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#D4B483]/15 rounded-full blur-3xl pointer-events-none" />

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
            <MapPin className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.navVenue}
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#2C3629]">
            {t.venueTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5844] max-w-xl mx-auto font-sans">
            {t.venueSubtitle}
          </p>
        </motion.div>

        {/* Venue Info Box & Interactive Map Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 glass-card rounded-3xl p-8 sm:p-10 border-2 border-[#D4B483]/40 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4B483] mb-2">
                <Sparkles className="w-4 h-4" />
                Wedding Location
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#2C3629] mb-6">
                {t.venueName}
              </h3>

              <div className="space-y-6 text-left">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl gold-gradient-bg text-white shrink-0 shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#3E4A3A]">Address</h4>
                    <p className="text-sm sm:text-base text-[#2C3629] font-medium leading-snug mt-1">
                      {t.venueAddress}
                    </p>
                  </div>
                </div>

                {/* Event Time */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl gold-gradient-bg text-white shrink-0 shadow-md">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#3E4A3A]">{t.venueTimeLabel}</h4>
                    <p className="text-sm sm:text-base text-[#2C3629] font-medium mt-1">
                      {t.venueTimeVal}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl gold-gradient-bg text-white shrink-0 shadow-md">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider font-semibold text-[#3E4A3A]">{t.venueContactLabel}</h4>
                    <p className="text-sm sm:text-base text-[#2C3629] font-medium mt-1">
                      {t.venueContactVal}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps External Button */}
            <div className="mt-8 pt-6 border-t border-[#D4B483]/30">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl gold-gradient-bg text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all shimmer-gold"
              >
                <Navigation className="w-5 h-5" />
                <span>{t.venueGoogleMapsBtn}</span>
                <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
              </motion.a>
            </div>
          </motion.div>

          {/* Styled Map Embed Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative rounded-3xl overflow-hidden border-2 border-[#D4B483]/40 shadow-xl min-h-[350px] lg:min-h-full flex flex-col"
          >
            <iframe
              title="Moon Light Hotel Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.12356!2d79.8464321!3d7.4152353!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2c40cf5ec3e43%3A0xd1b5b163dbbed501!2sMoon%20Light%20Hotel!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
              className="w-full h-full min-h-[350px] border-0 filter contrast-105 saturate-90"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
