import React from 'react';
import { motion } from 'framer-motion';

const WelcomeScreen = ({ onStart }) => {
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
                transition={{ delay: 1.5 }}
                className="text-lg text-rose-800 font-nunito mb-12"
            >
                Ready to see your gift? ✨
            </motion.p>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStart}
                className="px-8 py-4 bg-rose-500 text-white rounded-full font-bold text-xl shadow-lg relative overflow-hidden group"
            >
                <span className="relative z-10 flex items-center gap-2">
                    Let's Go ❤️
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
        </div>
    );
};

export default WelcomeScreen;
