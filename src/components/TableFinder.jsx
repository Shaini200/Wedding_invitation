import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserCheck, Sparkles, HelpCircle, Armchair } from 'lucide-react';
import { guestList } from '../data/guests';
import { translations } from '../data/translations';

export default function TableFinder({ currentLang }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [matchingGuests, setMatchingGuests] = useState([]);

  const t = translations[currentLang] || translations.en;

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setMatchingGuests([]);
      setSearched(false);
      return;
    }

    const results = guestList.filter((guest) => {
      const matchEn = guest.nameEn.toLowerCase().includes(query);
      const matchSi = guest.nameSi.toLowerCase().includes(query);
      return matchEn || matchSi;
    });

    setMatchingGuests(results);
    setSearched(true);
  };

  return (
    <section id="seating" className="py-24 px-4 bg-[#FAF7F2] relative">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.seatingTitle}
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#2C3629] mb-4">
            {t.seatingSubtitle}
          </h2>
          <p className="text-sm text-[#4A5844] max-w-lg mx-auto">
            {t.seatingInstructions}
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-6 sm:p-10 border-2 border-[#D4B483]/40 shadow-2xl mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.seatingSearchPlaceholder}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-[#D4B483]/40 text-[#2C3629] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D4B483] font-medium shadow-inner"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-8 py-4 rounded-2xl gold-gradient-bg text-white font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>{t.seatingSearchBtn}</span>
            </motion.button>
          </form>

          {/* Results Area */}
          <AnimatePresence mode="wait">
            {searched && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-8 border-t border-[#D4B483]/20"
              >
                {matchingGuests.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchingGuests.map((guest) => (
                      <motion.div
                        key={guest.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-gold rounded-2xl p-6 border border-[#D4B483] shadow-md text-left relative overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs uppercase font-bold tracking-wider text-[#B89355] flex items-center gap-1.5">
                            <UserCheck className="w-4 h-4" />
                            {currentLang === 'si' ? guest.groupSi : guest.groupEn}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-[#3E4A3A] text-white text-xs font-mono font-bold">
                            {guest.seatNo}
                          </span>
                        </div>

                        <h4 className="text-xl font-heading font-bold text-[#2C3629] mb-4">
                          {currentLang === 'si' ? guest.nameSi : guest.nameEn}
                        </h4>

                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#D4B483]/30 text-xs">
                          <div>
                            <span className="block text-gray-500 uppercase font-semibold">{t.seatingTableLabel}</span>
                            <span className="text-2xl font-bold font-mono text-[#B89355]">
                              {guest.tableNo}
                            </span>
                          </div>
                          <div>
                            <span className="block text-gray-500 uppercase font-semibold">{t.seatingTableNameLabel}</span>
                            <span className="font-semibold text-[#2C3629] block truncate">
                              {currentLang === 'si' ? guest.tableNameSi : guest.tableNameEn}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Empty state message */
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 rounded-2xl bg-red-50/70 border border-red-200 text-center text-red-800"
                  >
                    <HelpCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <p className="text-sm font-medium leading-relaxed">
                      {t.seatingNotFoundMsg}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
