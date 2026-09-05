import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Send, CheckCircle2, User, Phone, Mail, Users, MessageSquare, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import emailjs from '@emailjs/browser';
import { translations } from '../data/translations';

// ✅ EmailJS Configuration
const EMAILJS_SERVICE_ID  = 'service_01mg02w';
const EMAILJS_TEMPLATE_ID = 'template_5fl81ra';
const EMAILJS_PUBLIC_KEY  = 'WPhKpwBCT5CYsPP4Z';

export default function RSVPSection({ currentLang, onAddWish }) {
  const t = translations[currentLang] || translations.en;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '1',
    attending: 'yes',
    wish: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const now = new Date();
    const timestamp = now.toLocaleString('en-GB', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });

    const templateParams = {
      guest_name:  formData.name,
      guest_phone: formData.phone,
      guest_email: formData.email || 'Not provided',
      guest_count: formData.guests,
      attending:   formData.attending === 'yes' ? '✅ Attending' : '❌ Not Attending',
      message:     formData.wish || 'No message',
      timestamp:   timestamp,
      to_email:    'tharusha14ishadi@gmail.com',
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
    } catch (err) {
      console.error('EmailJS error:', err);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Confetti
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error('Confetti error:', err);
    }

    // Add wish to wishes wall
    if (formData.wish.trim() && onAddWish) {
      onAddWish({ name: formData.name, message: formData.wish });
    }
  };


  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      guests: '1',
      attending: 'yes',
      wish: ''
    });
  };

  return (
    <section id="rsvp" className="py-20 md:py-32 px-4 relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F8E8E8]/40 to-[#FAF7F2]">
      {/* Background Decor Orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#D4B483]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.rsvpTitle}
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#2C3629]">
            {t.rsvpTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5844] max-w-xl mx-auto font-sans">
            {t.rsvpSubtitle}
          </p>
        </motion.div>

        {/* RSVP Card & Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-6 sm:p-12 border-2 border-[#D4B483]/40 shadow-2xl relative overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4A3A] mb-2">
                {t.rsvpNameLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.rsvpNamePlaceholder}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/80 border border-[#D4B483]/40 focus:border-[#D4B483] focus:outline-none text-[#2C3629] text-sm shadow-sm transition-all"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4B483]" />
              </div>
            </div>

            {/* Phone & Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4A3A] mb-2">
                  {t.rsvpPhoneLabel}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t.rsvpPhonePlaceholder}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/80 border border-[#D4B483]/40 focus:border-[#D4B483] focus:outline-none text-[#2C3629] text-sm shadow-sm transition-all"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4B483]" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4A3A] mb-2">
                  {t.rsvpEmailLabel}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.rsvpEmailPlaceholder}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/80 border border-[#D4B483]/40 focus:border-[#D4B483] focus:outline-none text-[#2C3629] text-sm shadow-sm transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4B483]" />
                </div>
              </div>
            </div>

            {/* Attendance Radios & Guest Counter Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Attendance */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4A3A] mb-2">
                  {t.rsvpAttendanceLabel}
                </label>
                <div className="flex items-center gap-4 pt-1">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-[#D4B483]/40 bg-white/60 cursor-pointer hover:bg-white transition-all text-xs font-semibold text-[#2C3629]">
                    <input
                      type="radio"
                      name="attending"
                      value="yes"
                      checked={formData.attending === 'yes'}
                      onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                      className="accent-[#D4B483]"
                    />
                    <span>{t.rsvpYes}</span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-gray-200 bg-white/60 cursor-pointer hover:bg-white transition-all text-xs font-semibold text-gray-600">
                    <input
                      type="radio"
                      name="attending"
                      value="no"
                      checked={formData.attending === 'no'}
                      onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                      className="accent-gray-400"
                    />
                    <span>{t.rsvpNo}</span>
                  </label>
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4A3A] mb-2">
                  {t.rsvpGuestsLabel}
                </label>
                <div className="relative">
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/80 border border-[#D4B483]/40 focus:border-[#D4B483] focus:outline-none text-[#2C3629] text-sm shadow-sm transition-all"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4B483]" />
                </div>
              </div>
            </div>

            {/* Special Wish Message */}
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#3E4A3A] mb-2">
                {t.rsvpWishLabel}
              </label>
              <div className="relative">
                <textarea
                  rows="3"
                  value={formData.wish}
                  onChange={(e) => setFormData({ ...formData, wish: e.target.value })}
                  placeholder={t.rsvpWishPlaceholder}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/80 border border-[#D4B483]/40 focus:border-[#D4B483] focus:outline-none text-[#2C3629] text-sm shadow-sm transition-all"
                ></textarea>
                <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-[#D4B483]" />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full py-4 rounded-2xl gold-gradient-bg text-white font-semibold text-base shadow-xl flex items-center justify-center gap-2 hover:shadow-2xl transition-all shimmer-gold disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t.rsvpSubmitting}</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>{t.rsvpSubmitBtn}</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Confirmation Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C3629]/70 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-3xl p-8 sm:p-12 text-center max-w-md w-full border-2 border-[#D4B483] shadow-2xl relative"
            >
              <div className="w-20 h-20 rounded-full gold-gradient-bg flex items-center justify-center text-white mx-auto mb-6 shadow-xl shimmer-gold">
                <CheckCircle2 className="w-10 h-10 animate-pulse" />
              </div>

              <h3 className="text-3xl font-heading font-bold text-[#2C3629] mb-2">
                {t.rsvpSuccessTitle}
              </h3>
              <p className="text-sm text-[#4A5844] font-sans leading-relaxed mb-8">
                {t.rsvpSuccessMsg}
              </p>

              <button
                onClick={handleReset}
                className="w-full py-3.5 rounded-2xl bg-white border-2 border-[#D4B483] text-[#2C3629] font-semibold text-sm hover:bg-[#FAF7F2] transition-all"
              >
                {t.rsvpSuccessClose}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
