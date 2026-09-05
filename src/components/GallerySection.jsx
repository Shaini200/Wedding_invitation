import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Sparkles, X, Maximize2, Heart } from 'lucide-react';
import { galleryPhotos } from '../data/gallery';
import { translations } from '../data/translations';

export default function GallerySection({ currentLang }) {
  const t = translations[currentLang] || translations.en;
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const tabs = [
    { id: 'all', label: t.galleryTabAll },
    { id: 'engagement', label: t.galleryTabEngagement },
    { id: 'preWedding', label: t.galleryTabPreWedding },
    { id: 'romance', label: t.galleryTabRomance }
  ];

  const filteredPhotos = activeTab === 'all'
    ? galleryPhotos
    : galleryPhotos.filter(p => p.category === activeTab);

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F8E8E8]/30 to-[#FAF7F2]">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4B483]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A8B5A2]/20 text-[#3E4A3A] text-xs font-semibold uppercase tracking-widest">
            <ImageIcon className="w-3.5 h-3.5 text-[#D4B483]" />
            {t.navGallery}
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-[#2C3629]">
            {t.galleryTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5844] max-w-xl mx-auto font-sans">
            {t.gallerySubtitle}
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-12">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'gold-gradient-bg text-white shadow-md'
                  : 'glass-card text-[#2C3629] hover:bg-white border border-[#D4B483]/30'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Masonry Image Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-3xl overflow-hidden glass-card border-2 border-[#D4B483]/30 shadow-lg cursor-pointer aspect-square"
              >
                <img
                  src={photo.thumb}
                  alt={currentLang === 'si' ? photo.titleSi : photo.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C3629]/80 via-[#2C3629]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-xl leading-tight">
                        {currentLang === 'si' ? photo.titleSi : photo.titleEn}
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider text-[#D4B483] font-semibold mt-1 block">
                        Kasun & Dinithi
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-3xl border-2 border-[#D4B483]/50 shadow-2xl bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 p-3 rounded-full bg-black/60 text-white hover:bg-black transition-colors border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={selectedPhoto.url}
                alt={currentLang === 'si' ? selectedPhoto.titleSi : selectedPhoto.titleEn}
                className="w-full max-h-[75vh] object-contain mx-auto"
              />

              <div className="p-6 bg-[#2C3629] text-white flex items-center justify-between border-t border-[#D4B483]/30">
                <div>
                  <h3 className="font-heading font-bold text-2xl">
                    {currentLang === 'si' ? selectedPhoto.titleSi : selectedPhoto.titleEn}
                  </h3>
                  <p className="text-xs text-[#D4B483] uppercase tracking-wider mt-1">
                    Kasun & Dinithi's Wedding Memory
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-rose-300">
                  <Heart className="w-4 h-4 fill-rose-400" />
                  <span>October 2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
