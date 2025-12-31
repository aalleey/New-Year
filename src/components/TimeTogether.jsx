import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TimeTogether = ({ onNext }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Start Date: December 15, 2025
        const startDate = new Date('2025-12-15T00:00:00');

        const timer = setInterval(() => {
            const now = new Date();
            const difference = now.getTime() - startDate.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6 text-center">
            <h2 className="text-3xl font-pacifico text-rose-600 mb-2">
                We've been together for...
            </h2>
            <p className="font-nunito text-rose-400 mb-8">since Dec 15, 2025</p>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full mb-12">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hrs" />
                <TimeUnit value={timeLeft.minutes} label="Mins" />
                <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>

            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-6xl text-rose-500 mb-12"
            >
                ❤️
            </motion.div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-lg"
            >
                See What's Next 💕
            </motion.button>
        </div>
    );
};

const TimeUnit = ({ value, label }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg flex flex-col items-center justify-center border-2 border-pink-100">
        <span className="text-2xl sm:text-3xl font-bold text-rose-600 font-nunito">
            {value.toString().padStart(2, '0')}
        </span>
        <span className="text-xs text-rose-400 uppercase tracking-wider mt-1">{label}</span>
    </div>
);

export default TimeTogether;
