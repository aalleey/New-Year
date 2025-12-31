import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeScreen = ({ onStart }) => {
    const [showModal, setShowModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleStart = () => {
        if (isChecked) {
            onStart();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 h-full relative z-10 w-full max-w-md mx-auto text-center">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="mb-8"
            >
                <span className="text-8xl filter drop-shadow-md">🧸</span>
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1.5 }}
                className="text-5xl font-pacifico text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-6 leading-relaxed py-2"
            >
                Happy New Year<br />My Love
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="text-sm text-rose-400 font-nunito mb-6 italic"
            >
                (put on headphones & relax 🎧)
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-lg text-rose-800 font-nunito mb-12"
            >
                Ready to see your gift? ✨
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(true)}
                className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold text-xl shadow-lg relative overflow-hidden group"
            >
                <span className="relative z-10 flex items-center gap-2">
                    Let's Go ❤️
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>

            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white/95 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center border-2 border-rose-100"
                        >
                            <span className="text-6xl mb-4 block">🎧</span>
                            <h3 className="text-2xl font-bold text-rose-600 mb-2 font-pacifico">One Tiny Request</h3>
                            <p className="text-rose-800 mb-6 font-nunito">
                                To truly feel the magic, this experience is best enjoyed with headphones.
                            </p>

                            <div
                                className="flex flex-col items-center justify-center gap-4 mb-8 cursor-pointer"
                                onClick={() => setIsChecked(!isChecked)}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    animate={{
                                        scale: isChecked ? [1, 1.1, 1] : 1,
                                        rotate: isChecked ? [0, -10, 10, 0] : 0
                                    }}
                                    className={`w-24 h-24 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${isChecked ? 'bg-rose-500 text-white shadow-rose-300' : 'bg-gray-100 text-gray-400'}`}
                                >
                                    <span className="text-5xl">{isChecked ? '🔊' : '🔇'}</span>
                                </motion.div>
                                <span className={`font-nunito font-semibold transition-colors duration-300 ${isChecked ? 'text-rose-600' : 'text-gray-400'}`}>
                                    {isChecked ? "Speaker Open!" : "Tap to Open Speaker"}
                                </span>
                            </div>

                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-rose-500 font-nunito hover:bg-rose-50 rounded-lg transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleStart}
                                    disabled={!isChecked}
                                    className={`px-6 py-2 rounded-full font-bold shadow-md transition-all duration-300 ${isChecked
                                        ? 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-105'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Start Journey
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default WelcomeScreen;
