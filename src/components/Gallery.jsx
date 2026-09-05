import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { galleryPhotos } from '../data/gallery';
import { translations } from '../data/translations';

export default function Gallery({ currentLang }) {
  const t = translations[currentLang] || translations.en;

  const [activeTab, setActiveTab] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filteredPhotos = galleryPhotos.filter(
    (photo) => activeTab === 'all' || photo.category === activeTab
  );

  const tabs = [
    { key: 'all', label: t.galleryTabAll },
    { key: 'engagement', label: t.galleryTabEngagement },
    { key: 'preWedding', label: t.galleryTabPreWedding },
    { key: 'romance', label: t.galleryTabRomance }
  ];

  const handlePrev = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredPhotos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setLightboxIndex((prev) => (prev === filteredPhotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.galleryTitle}
          </div>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-[#2C3629] mb-4">
            {t.gallerySubtitle}
          </h2>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full mb-8" />

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeTab === tab.key
                    ? 'gold-gradient-bg text-white shadow-md'
                    : 'glass-card text-[#2C3629] hover:bg-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-[#D4B483]/30 bg-white"
              >
                <img
                  src={photo.thumb}
                  alt={currentLang === 'si' ? photo.titleSi : photo.titleEn}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3629]/90 via-[#2C3629]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#D4B483] font-semibold mb-1">
                    {photo.category}
                  </span>
                  <h4 className="text-xl font-heading font-bold mb-2">
                    {currentLang === 'si' ? photo.titleSi : photo.titleEn}
                  </h4>
                  <div className="inline-flex items-center gap-1.5 text-xs text-white/80">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Click to Expand</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Main Image */}
              <div className="max-w-4xl max-h-[85vh] text-center">
                <img
                  src={filteredPhotos[lightboxIndex].url}
                  alt={
                    currentLang === 'si'
                      ? filteredPhotos[lightboxIndex].titleSi
                      : filteredPhotos[lightboxIndex].titleEn
                  }
                  className="max-h-[75vh] w-auto mx-auto rounded-2xl shadow-2xl border border-white/20"
                />
                <p className="mt-4 text-lg font-heading text-white">
                  {currentLang === 'si'
                    ? filteredPhotos[lightboxIndex].titleSi
                    : filteredPhotos[lightboxIndex].titleEn}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
