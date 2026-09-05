import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InvitationCard from './components/InvitationCard';
import VenueSection from './components/VenueSection';
import ScheduleSection from './components/ScheduleSection';
import CalendarSection from './components/CalendarSection';
import RSVPSection from './components/RSVPSection';
import WishesWall from './components/WishesWall';
import Footer from './components/Footer';
import LanguageModal from './components/LanguageModal';
import FloatingPetals from './components/FloatingPetals';
import './App.css';

export default function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [showLangModal, setShowLangModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const youtubeIframeRef = useRef(null);

  // Initial wishes state with default bilingual entries
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: "Saman & Champa Kumara",
      message: "Wishing you both a lifetime of happiness, unconditional love, and joy together!",
      date: "Dec 2026"
    },
    {
      id: 2,
      name: "නිරෝෂා ප්‍රනාන්දු",
      message: "රජිත සහ තරුෂා යුවලට සාමය, සතුට සහ සමෘද්ධිය පිරි සුබ මංගල ජීවිතයකට හදපිරි සුභපැතුම්!",
      date: "Dec 2026"
    },
    {
      id: 3,
      name: "Michael & Sarah",
      message: "May your wedding day be filled with sweet memories and your marriage with endless love.",
      date: "Dec 2026"
    }
  ]);

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLang = localStorage.getItem('wedding_lang');
    if (savedLang) {
      setCurrentLang(savedLang);
      setShowLangModal(false);
    } else {
      setShowLangModal(true);
    }
  }, []);

  const handleSelectLanguage = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('wedding_lang', lang);
    setShowLangModal(false);

    // Play background YouTube music automatically upon language selection (user interaction)
    setTimeout(() => {
      if (youtubeIframeRef.current) {
        youtubeIframeRef.current.contentWindow.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        );
        setIsPlayingAudio(true);
      }
    }, 500);
  };

  const handleToggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'si' : 'en';
    setCurrentLang(nextLang);
    localStorage.setItem('wedding_lang', nextLang);
  };

  const handleAddWish = (newWish) => {
    setWishes((prev) => [
      {
        id: Date.now(),
        name: newWish.name,
        message: newWish.message,
        date: "Just now"
      },
      ...prev
    ]);
  };

  // YouTube Audio Toggle Controller
  const toggleAudio = () => {
    if (!youtubeIframeRef.current) return;

    if (isPlayingAudio) {
      youtubeIframeRef.current.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        '*'
      );
      setIsPlayingAudio(false);
    } else {
      youtubeIframeRef.current.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        '*'
      );
      setIsPlayingAudio(true);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF7F2] text-[#2C3629] relative overflow-x-hidden ${currentLang === 'si' ? 'font-si' : ''}`}>
      {/* Hidden YouTube Background Audio Player */}
      <iframe
        ref={youtubeIframeRef}
        title="Wedding Background Music"
        className="hidden pointer-events-none"
        width="1"
        height="1"
        src="https://www.youtube.com/embed/i4zApmHngxc?enablejsapi=1&autoplay=0&loop=1&playlist=i4zApmHngxc"
        allow="autoplay"
      ></iframe>

      {/* Floating Petals Canvas Background */}
      <FloatingPetals />

      {/* Language Selection First Screen Overlay */}
      <LanguageModal
        isOpen={showLangModal}
        onSelectLanguage={handleSelectLanguage}
      />

      {/* Sticky Glass Navbar */}
      <Navbar
        currentLang={currentLang}
        onToggleLanguage={handleToggleLanguage}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={toggleAudio}
      />

      {/* Main Single Page Sections */}
      <main>
        <HeroSection currentLang={currentLang} />
        <InvitationCard currentLang={currentLang} />
        <VenueSection currentLang={currentLang} />
        <ScheduleSection currentLang={currentLang} />
        <CalendarSection currentLang={currentLang} />
        <RSVPSection currentLang={currentLang} onAddWish={handleAddWish} />
        <WishesWall currentLang={currentLang} wishes={wishes} onAddWish={handleAddWish} />
      </main>

      {/* Luxury Footer */}
      <Footer currentLang={currentLang} />
    </div>
  );
}
