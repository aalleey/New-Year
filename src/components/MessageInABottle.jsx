import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const loveNotes = [
    "You are my favorite notification. 📱",
    "I promise to always be by your side. 🤝",
    "You make my heart smile. 💓",
    "Every day with you is a new adventure. 🌍",
    "I love who I am when I'm with you. ✨",
    "You're the best thing that ever happened to me. 🎁",
    "I choose you. And I'll choose you over and over. ❤️",
    "Your happiness is my favorite project. 🎨",
    "Growing old with you is my biggest goal. 👵👴",
    "You are my home. 🏡"
];

const MessageInABottle = ({ onNext }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");

    const openBottle = () => {
        if (isOpen) return;

        // Pick random message
        const randomMsg = loveNotes[Math.floor(Math.random() * loveNotes.length)];
        setMessage(randomMsg);
        setIsOpen(true);

        // Confetti effect
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#60a5fa', '#93c5fd', '#bfdbfe'] // Ocean blue vibes
        });
    };

    const reset = () => {
        setIsOpen(false);
        setMessage("");
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6 relative">
            <h2 className="text-3xl font-pacifico text-blue-500 mb-8 text-center drop-shadow-sm">
                Message in a Bottle 🍾
            </h2>

            <div className="relative w-64 h-64 flex items-center justify-center cursor-pointer" onClick={openBottle}>
                <AnimatePresence>
                    {!isOpen ? (
                        <motion.div
                            initial={{ y: 0, rotate: 0 }}
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            exit={{ scale: 0, opacity: 0, rotate: 180 }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-9xl filter drop-shadow-xl"
                        >
                            🍾
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="absolute inset-0 z-10"
                        >
                            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border-2 border-blue-200 transform rotate-1">
                                <p className="font-pacifico text-2xl text-blue-600 text-center leading-relaxed">
                                    "{message}"
                                </p>
                                <div className="mt-4 text-center">
                                    <span className="text-2xl">💌</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Water ripples */}
                {!isOpen && (
                    <div className="absolute bottom-0 w-32 h-8 bg-blue-200/50 rounded-[100%] blur-md animate-pulse" />
                )}
            </div>

            <div className="mt-12 space-y-4 flex flex-col items-center w-full relative z-20">
                {isOpen && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={reset}
                        className="text-blue-400 hover:text-blue-600 font-nunito font-bold text-sm"
                    >
                        Open Another One 🔄
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="px-8 py-3 bg-blue-500 text-white rounded-full font-bold shadow-lg w-full max-w-xs"
                >
                    Continue the Journey 🌊
                </motion.button>
            </div>
        </div>
    );
};

export default MessageInABottle;
