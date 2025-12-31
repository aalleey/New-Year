import React, { useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import musicUrl from '../assets/background.mp3';

const BackgroundMusic = ({ isPlaying, setIsPlaying }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        // Attempt auto-play on mount
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.4;
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (err) {
                    console.log("Autoplay waiting for interaction");
                }
            }
        };

        // Only attempt to start IF we are supposed to be playing initially 
        // (though usually we start false, so maybe we want to force start)
        // Actually, we want to try to start immediately.
        playAudio();

        const handleFirstClick = () => {
            if (audioRef.current && audioRef.current.paused) {
                playAudio();
            }
        };

        window.addEventListener('click', handleFirstClick, { once: true });
        return () => window.removeEventListener('click', handleFirstClick);
    }, []);

    useEffect(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Play failed", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <audio
                ref={audioRef}
                src={musicUrl}
                loop
                preload="auto"
            />

            <button
                onClick={togglePlay}
                className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg text-rose-500 hover:scale-110 transition-transform"
                title={isPlaying ? "Mute Music" : "Play Music"}
            >
                {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </div>
    );
};

export default BackgroundMusic;
