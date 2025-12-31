import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import ussImage from '../assets/uss.png';

const FinalMessage = ({ onReplay }) => {
    useEffect(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#f43f5e', '#fda4af'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ffe4e6', '#f43f5e'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center w-full max-w-md mx-auto relative overflow-hidden">

            {/* Hanging Polaroid */}
            <motion.div
                initial={{ rotate: -5, opacity: 0, y: -50 }}
                animate={{ rotate: 3, opacity: 1, y: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="relative bg-white p-4 pb-16 shadow-2xl transform rotate-3 mb-10 w-64 border border-gray-100"
            >
                {/* Tape Effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/50 backdrop-blur-sm border-l border-r border-white/30 rotate-1 shadow-sm opacity-80 z-20"
                    style={{ clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)" }}
                />

                <img
                    src={ussImage}
                    alt="Us Together"
                    className="w-full h-auto object-cover border border-gray-100 filter contrast-110 grayscale-[20%] sepia-[10%]"
                />

                <div className="absolute bottom-4 left-0 w-full text-center">
                    <p className="font-pacifico text-2xl text-slate-700 opacity-90">Us ❤️</p>
                </div>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-pacifico text-rose-600 mb-6"
            >
                Forever & Always
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-xl font-nunito text-rose-800 mb-12"
            >
                Happy New Year, my love! 💕
            </motion.p>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={onReplay}
                className="text-sm text-gray-400 hover:text-rose-500 transition-colors uppercase tracking-widest font-bold flex items-center gap-2"
            >
                <span>↺</span> Replay Our Story
            </motion.button>
        </div>
    );
};

export default FinalMessage;
