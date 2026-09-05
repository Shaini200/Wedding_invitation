import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, Sparkles, AlertCircle, CheckCircle2, Bookmark } from 'lucide-react';
import { guestList } from '../data/guests';
import { translations } from '../data/translations';

export default function SeatingPlanSection({ currentLang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const t = translations[currentLang] || translations.en;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setHasSearched(false);
      setSearchResults([]);
      return;
    }

    const query = searchTerm.trim().toLowerCase();
    const matches = guestList.filter((guest) => {
      const nameEnMatch = guest.nameEn.toLowerCase().includes(query);
      const nameSiMatch = guest.nameSi.toLowerCase().includes(query);
      const tableMatch = guest.tableNo.toLowerCase().includes(query);
      return nameEnMatch || nameSiMatch || tableMatch;
    });

    setSearchResults(matches);
    setHasSearched(true);
  };

  return (
    <section id="seating" className="py-20 md:py-32 px-4 relative overflow-hidden bg-[#FAF7F2]">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#A8B5A2]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.navSeating}
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#2C3629]">
            {t.seatingTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5844] max-w-xl mx-auto font-sans">
            {t.seatingSubtitle}
          </p>
        </motion.div>

        {/* Search Bar Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-10"
        >
          <form onSubmit={handleSearch} className="relative flex items-center">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.seatingSearchPlaceholder}
                className="w-full pl-12 pr-32 py-4 rounded-2xl glass-card border-2 border-[#D4B483]/50 focus:border-[#D4B483] focus:outline-none text-[#2C3629] text-sm sm:text-base placeholder-gray-400 shadow-lg transition-all"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4B483]" />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="absolute right-2 px-5 py-2.5 rounded-xl gold-gradient-bg text-white font-semibold text-xs sm:text-sm shadow-md transition-all"
            >
              {t.seatingSearchBtn}
            </motion.button>
          </form>

          <p className="text-[11px] text-center text-gray-500 mt-3 font-sans">
            💡 {t.seatingInstructions}
          </p>
        </motion.div>

        {/* Search Results / Status Display */}
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {hasSearched && searchResults.length > 0 && (
              <motion.div
                key="found-results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                {searchResults.map((guest) => (
                  <div
                    key={guest.id}
                    className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-[#D4B483] shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6"
                  >
                    <div className="text-left w-full sm:w-auto">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold mb-2">
                        <Bookmark className="w-3.5 h-3.5 text-[#D4B483]" />
                        <span>{currentLang === 'si' ? guest.groupSi : guest.groupEn}</span>
                      </div>

                      <h4 className="text-2xl font-heading font-bold text-[#2C3629]">
                        {currentLang === 'si' ? guest.nameSi : guest.nameEn}
                      </h4>
                      <p className="text-xs text-gray-500 font-sans mt-0.5">
                        {currentLang === 'si' ? guest.nameEn : guest.nameSi}
                      </p>
                    </div>

                    {/* Table & Seat Badges */}
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-around sm:justify-end border-t sm:border-t-0 border-[#D4B483]/30 pt-4 sm:pt-0">
                      <div className="text-center p-3 rounded-2xl bg-white/80 border border-[#D4B483]/40 min-w-[90px] shadow-sm">
                        <span className="block text-[10px] uppercase font-semibold text-[#3E4A3A]">{t.seatingTableLabel}</span>
                        <span className="block text-2xl font-heading font-bold gold-gradient-text">
                          {guest.tableNo}
                        </span>
                      </div>

                      <div className="text-center p-3 rounded-2xl gold-gradient-bg text-white min-w-[90px] shadow-md shimmer-gold">
                        <span className="block text-[10px] uppercase font-semibold text-white/80">{t.seatingSeatLabel}</span>
                        <span className="block text-2xl font-heading font-bold">
                          {guest.seatNo}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {hasSearched && searchResults.length === 0 && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-3xl p-8 border-2 border-rose-200 text-center shadow-lg"
              >
                <AlertCircle className="w-12 h-12 text-rose-400 mx-auto mb-3 animate-bounce" />
                <h4 className="text-lg font-heading font-bold text-[#2C3629] mb-2">
                  Guest Not Found
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
                  {t.seatingNotFoundMsg}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
