import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import soulmateSong from '../assets/Soulmate.mp3';

const LoveLetter = ({ onNext, setIsBgMusicPlaying }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const scrollRef = useRef(null);
    const audioRef = useRef(new Audio(soulmateSong));
    const hasStartedTyping = useRef(false);

    const fullText = `My Dearest Love,

From the moment you walked into my life, everything changed for the better. You are the light that guides me through my darkest days and the warmth that comforts me when I'm cold.

Every smile you share makes my heart skip a beat, and every laugh is like my favorite melody. I never knew love could feel this safe, this exciting, and this right—until I met you.

Thank you for being my partner, my best friend, and my soulmate. I promise to cherish every moment with you, to support your dreams, and to love you more with each passing day.

Here's to us, and to a lifetime of beautiful memories.

Forever yours,
Your Soulmate ❤️`;

    useEffect(() => {
        // 1. Pause global background music
        setIsBgMusicPlaying(false);

        // 2. Setup local audio (Soulmate.mp3)
        const audio = audioRef.current;
        audio.volume = 0.2; // Low volume as requested

        // 3. Play audio and Calculate typing speed based on duration
        const startTyping = () => {
            if (hasStartedTyping.current) return;
            hasStartedTyping.current = true;

            const duration = audio.duration || 200; // Fallback if duration unavailable
            // Calculate speed: (Duration in ms) / (Character count)
            // We subtract a small buffer (e.g. 5 seconds) to finish typing slightly before song ends
            const effectiveDuration = Math.max(duration - 5, 10) * 1000;
            const speed = effectiveDuration / fullText.length;

            startTypewriter(speed);
        };

        audio.addEventListener('loadedmetadata', startTyping);

        // In case metadata is already loaded or fails, fallback start
        if (audio.readyState >= 1) {
            startTyping();
        } else {
            // Fallback timeout to ensure typing starts if audio load hangs
            setTimeout(() => {
                if (isTyping && displayedText.length === 0) startTyping();
            }, 2000);
        }

        audio.play().catch(e => console.log("Audio play failed:", e));

        return () => {
            // Cleanup: Stop song, Resume global BG music
            audio.pause();
            audio.currentTime = 0;
            setIsBgMusicPlaying(true);
        };
    }, []);

    const startTypewriter = (speed) => {
        let index = 0;

        const intervalId = setInterval(() => {
            setDisplayedText((prev) => {
                // Safe check for index
                if (index >= fullText.length) {
                    clearInterval(intervalId);
                    setIsTyping(false);
                    return prev;
                }
                return prev + fullText.charAt(index);
            });

            index++;

            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, speed);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6 relative">
            <h2 className="text-3xl font-pacifico text-rose-600 mb-6 text-center">
                For My Soulmate 💌
            </h2>

            <div className="w-full bg-[#fafdf6] p-6 rounded-lg shadow-xl border-2 border-rose-100 flex-1 overflow-hidden relative" style={{ maxHeight: '500px' }}>
                {/* Paper Texture / Lines */}
                <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(244,63,94,0.3)_1px,transparent_1px)] bg-[size:100%_2rem]" />

                <div className="flex justify-end mb-4">
                    <span className="font-mono text-xs text-gray-400">
                        {new Date().toLocaleDateString()}
                    </span>
                </div>

                <div
                    ref={scrollRef}
                    className="h-full overflow-y-auto pr-2 pb-12 font-nunito text-lg text-slate-700 leading-loose whitespace-pre-wrap no-scrollbar"
                >
                    {displayedText}
                    {isTyping && <span className="inline-block w-1 h-5 bg-rose-500 ml-1 animate-pulse" />}
                </div>
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: !isTyping ? 1 : 0.5 }}
                whileHover={!isTyping ? { scale: 1.05 } : {}}
                onClick={!isTyping ? onNext : null}
                className={`mt-6 px-8 py-3 rounded-full font-bold shadow-lg transition-all ${!isTyping ? "bg-rose-500 text-white cursor-pointer" : "bg-gray-200 text-gray-400 cursor-wait"
                    }`}
            >
                {isTyping ? "Listening..." : "Read Next Note ❤️"}
            </motion.button>
        </div>
    );
};

export default LoveLetter;
