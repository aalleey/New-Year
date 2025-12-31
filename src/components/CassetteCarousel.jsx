import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Music } from 'lucide-react';

const messages = [
    { id: 1, emoji: "🐒", text: "To my favorite little monkey...", sub: "You make life so fun!" },
    { id: 2, emoji: "✨", text: "Every moment with you...", sub: "Is pure magic." },
    { id: 3, emoji: "❤️", text: "I love you more than...", sub: "Actually, I love you most." },
    { id: 4, emoji: "🐱", text: "You're my comfort person...", sub: "Safe, warm, and home." },
];

const CassetteCarousel = ({ onNext }) => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextCard = () => {
        setDirection(1);
        if (index === messages.length - 1) {
            onNext();
        } else {
            setIndex(index + 1);
        }
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            rotate: Math.random() * 4 - 2, // vivid tilt
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6">
            <h2 className="text-3xl font-pacifico text-rose-600 mb-8 min-h-[48px]">
                Note #{index + 1}
            </h2>

            <div className="relative w-full h-[400px] flex items-center justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -10000) {
                                nextCard();
                            }
                        }}
                        className="absolute w-full max-w-xs bg-white p-6 rounded-3xl shadow-xl border-4 border-pink-100 flex flex-col items-center justify-between aspect-[3/4]"
                    >
                        <div className="w-full bg-slate-100 rounded-lg p-2 mb-4 flex items-center justify-between opacity-50">
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                            </div>
                            <Music size={16} />
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                                <div className="w-2 h-2 rounded-full bg-slate-300" />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <span className="text-8xl mb-6 animate-wiggle">{messages[index].emoji}</span>
                            <p className="font-pacifico text-2xl text-rose-500 mb-2">{messages[index].text}</p>
                            <p className="font-nunito text-gray-500">{messages[index].sub}</p>
                        </div>

                        <div className="w-full text-right mt-4">
                            <span className="text-xs text-gray-400 font-mono tracking-widest">SIDE {index + 1}</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={nextCard}
                className="mt-8 bg-white text-rose-500 p-4 rounded-full shadow-lg border border-pink-100"
            >
                <ChevronRight size={32} />
            </motion.button>

            <p className="mt-4 text-sm text-rose-300 animate-pulse">
                {index === messages.length - 1 ? "Finish reading..." : "Swipe or tap to send love"}
            </p>
        </div>
    );
};

const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

export default CassetteCarousel;
