import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Globe, Menu, X, Heart } from 'lucide-react';
import { translations } from '../data/translations';

export default function Navbar({ currentLang, onToggleLanguage, isPlayingAudio, onToggleAudio }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang] || translations.en;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.navHome, href: "#hero" },
    { name: t.navInvitation, href: "#invitation" },
    { name: t.navVenue, href: "#venue" },
    { name: t.navSchedule, href: "#schedule" },
    { name: t.navRSVP, href: "#rsvp" },
    { name: t.navWishes, href: "#wishes" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'glass-card py-3 shadow-lg border-b border-[#D4B483]/30'
          : 'bg-gradient-to-b from-[#2C3629]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram / Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full gold-gradient-bg flex items-center justify-center text-white font-heading font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
            R&T
          </div>
          <div className="hidden sm:block text-left">
            <span className={`block font-heading font-semibold text-lg leading-none ${scrolled ? 'text-[#2C3629]' : 'text-white'}`}>
              {t.groomName} & {t.brideName}
            </span>
            <span className={`block text-[10px] tracking-widest uppercase ${scrolled ? 'text-[#3E4A3A]' : 'text-white/80'}`}>
              Dec 03, 2026
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs uppercase tracking-wider font-medium transition-colors hover:text-[#B89355] ${
                scrolled ? 'text-[#2C3629]' : 'text-white drop-shadow-sm'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions (Language Toggle & Audio Player) */}
        <div className="flex items-center gap-3">
          {/* Audio Toggle Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleAudio}
            title={isPlayingAudio ? t.audioPause : t.audioPlay}
            className={`p-2 rounded-full flex items-center gap-1.5 text-xs font-medium border transition-all ${
              scrolled
                ? 'bg-[#FAF7F2] border-[#D4B483] text-[#2C3629]'
                : 'bg-white/20 backdrop-blur-md border-white/40 text-white'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-[#D4B483] animate-pulse" />
                <span className="hidden sm:inline text-[11px]">{t.audioPause}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 opacity-70" />
                <span className="hidden sm:inline text-[11px]">{t.audioPlay}</span>
              </>
            )}
          </motion.button>

          {/* Language Selector Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleLanguage}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium border shadow-sm transition-all ${
              scrolled
                ? 'bg-white border-[#D4B483] text-[#2C3629]'
                : 'bg-white/20 backdrop-blur-md border-white/40 text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#D4B483]" />
            <span>{currentLang === 'en' ? '🇱🇰 සිංහල' : '🇬🇧 English'}</span>
          </motion.button>

          {/* Mobile Hamburger Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border ${
              scrolled
                ? 'border-gray-200 text-[#2C3629]'
                : 'border-white/30 text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-card border-t border-[#D4B483]/30 overflow-hidden px-4 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-4 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider font-semibold text-[#2C3629] hover:text-[#B89355] py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
