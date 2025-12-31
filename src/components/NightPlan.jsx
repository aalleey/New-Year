import React from 'react';
import { motion } from 'framer-motion';

const plans = [
    {
        icon: "🎬",
        title: "Movie Cuddles",
        description: "Cozy blankets & our favorite film"
    },
    {
        icon: "💋",
        title: "Midnight Kiss",
        description: "Starting the year with you"
    },
    {
        icon: "🫣",
        title: "Something Ahmmm...",
        description: "You know what I mean... 😉"
    }
];

const NightPlan = ({ onNext }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6 relative">
            <h2 className="text-4xl font-pacifico text-rose-600 mb-8 text-center drop-shadow-sm">
                Tonight's Plan 🌙
            </h2>

            <div className="w-full space-y-6 mb-10">
                {plans.map((plan, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.3, duration: 0.5 }}
                        className="flex items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border-2 border-indigo-100 transform hover:scale-105 transition-transform duration-300"
                    >
                        <div className="text-4xl mr-4 filter drop-shadow-md bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center shrink-0">
                            {plan.icon}
                        </div>
                        <div>
                            <h3 className="font-nunito text-xl font-bold text-slate-800">
                                {plan.title}
                            </h3>
                            <p className="font-nunito text-sm text-slate-500 font-medium">
                                {plan.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-8 py-3 bg-indigo-500 text-white rounded-full font-bold shadow-lg shadow-indigo-200"
            >
                I'm Ready 💜
            </motion.button>
        </div>
    );
};

export default NightPlan;
