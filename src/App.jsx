import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FloatingHearts from './components/FloatingHearts';
import BackgroundMusic from './components/BackgroundMusic';
import WelcomeScreen from './components/WelcomeScreen';
import PhotoGallery from './components/PhotoGallery';
import LoveLetter from './components/LoveLetter';
import TimeTogether from './components/TimeTogether';
import RelationshipQuiz from './components/RelationshipQuiz';
import NightPlan from './components/NightPlan';
import MessageInABottle from './components/MessageInABottle';
import CassetteCarousel from './components/CassetteCarousel';
import GoalList from './components/GoalList';
import FinalMessage from './components/FinalMessage';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [isBgMusicPlaying, setIsBgMusicPlaying] = useState(false);

  const nextScreen = () => {
    setCurrentScreen(prev => Math.min(prev + 1, 9)); // Updated count to 9
  };

  const replay = () => {
    setCurrentScreen(0);
  };

  const screens = [
    <WelcomeScreen key="welcome" onStart={nextScreen} />,
    <PhotoGallery key="photos" onNext={nextScreen} />,
    <LoveLetter key="letter" onNext={nextScreen} setIsBgMusicPlaying={setIsBgMusicPlaying} />,
    <TimeTogether key="time" onNext={nextScreen} />,
    <RelationshipQuiz key="quiz" onNext={nextScreen} />,
    <CassetteCarousel key="carousel" onNext={nextScreen} />,
    <NightPlan key="night" onNext={nextScreen} />,
    <GoalList key="goals" onNext={nextScreen} />,
    <MessageInABottle key="bottle" onNext={nextScreen} />,
    <FinalMessage key="final" onReplay={replay} />,
  ];

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100 overflow-hidden font-nunito text-slate-800">
      <BackgroundMusic
        isPlaying={isBgMusicPlaying}
        setIsPlaying={setIsBgMusicPlaying}
      />
      <FloatingHearts />

      <main className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
