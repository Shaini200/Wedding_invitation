import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Sparkles, Heart, User, Phone, Mail, Users, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../data/translations';

export default function RSVP({ currentLang, onNewWishSubmitted }) {
  const t = translations[currentLang] || translations.en;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '1',
    attendance: 'yes',
    wish: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);

      // Trigger Confetti Celebration Effect
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4B483', '#A8B5A2', '#F8E8E8', '#ffffff']
        });
      } catch (err) {
        console.error(err);
      }

      // If a wish was provided in the RSVP, forward it to the Wishes Wall!
      if (formData.wish.trim() && onNewWishSubmitted) {
        onNewWishSubmitted({
          name: formData.name,
          message: formData.wish,
          date: 'Just Now'
        });
      }
    }, 800);
  };

  return (
    <section id="rsvp" className="py-24 px-4 bg-[#FAF7F2] relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.rsvpTitle}
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#2C3629] mb-4">
            {t.rsvpSubtitle}
          </h2>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full" />
        </motion.div>

        {/* RSVP Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-8 sm:p-12 border-2 border-[#D4B483]/40 shadow-2xl relative"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#D4B483]" />
                  {t.rsvpNameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.rsvpNamePlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-[#2C3629] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4B483] font-medium"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-[#D4B483]" />
                  {t.rsvpPhoneLabel}
                </label>
                <input
                  type="text"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.rsvpPhonePlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-[#2C3629] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4B483] font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2 flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#D4B483]" />
                  {t.rsvpEmailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.rsvpEmailPlaceholder}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-[#2C3629] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4B483] font-medium"
                />
              </div>

              {/* Guests Count */}
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 mb-2 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#D4B483]" />
                  {t.rsvpGuestsLabel}
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl bg-white border border-gray-200 text-[#2C3629] focus:outline-none focus:ring-2 focus:ring-[#D4B483] font-medium"
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                  <option value="5">5 Persons</option>
                </select>
              </div>
            </div>

            {/* Attendance Toggle */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-2">
                {t.rsvpAttendanceLabel}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, attendance: 'yes' }))}
                  className={`py-3.5 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                    formData.attendance === 'yes'
                      ? 'gold-gradient-bg text-white border-[#D4B483] shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#D4B483]'
                  }`}
                >
                  {t.rsvpYes}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData((p) => ({ ...p, attendance: 'no' }))}
                  className={`py-3.5 px-4 rounded-xl border-2 font-medium text-sm transition-all ${
                    formData.attendance === 'no'
                      ? 'bg-gray-800 text-white border-gray-800 shadow-md'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {t.rsvpNo}
                </button>
              </div>
            </div>

            {/* Wishes message */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 mb-2 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#D4B483]" />
                {t.rsvpWishLabel}
              </label>
              <textarea
                name="wish"
                rows="3"
                value={formData.wish}
                onChange={handleChange}
                placeholder={t.rsvpWishPlaceholder}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-[#2C3629] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4B483] font-medium resize-none"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl gold-gradient-bg text-white font-bold text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 shimmer-gold"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? t.rsvpSubmitting : t.rsvpSubmitBtn}</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Success Modal */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="glass-card rounded-3xl p-8 max-w-md w-full text-center border-2 border-[#D4B483] shadow-2xl"
              >
                <div className="w-16 h-16 rounded-full gold-gradient-bg mx-auto flex items-center justify-center text-white mb-4 shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-3xl font-heading font-bold text-[#2C3629] mb-2">
                  {t.rsvpSuccessTitle}
                </h3>
                <p className="text-sm text-[#4A5844] mb-6 leading-relaxed">
                  {t.rsvpSuccessMsg}
                </p>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full py-3 rounded-xl gold-gradient-bg text-white font-semibold shadow-md"
                >
                  {t.rsvpSuccessClose}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
