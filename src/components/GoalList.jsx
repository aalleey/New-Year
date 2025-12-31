import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import clsx from 'clsx';
import { Check } from 'lucide-react';

const initialGoals = [
    { id: 1, text: "Go on long drives together and enjoy peaceful talks 🚗", checked: false },
    { id: 2, text: "Have dinner together sometimes and try new places 🍽️", checked: false },
    { id: 3, text: "Watch movies together and create cozy memories 🎬", checked: false },
    { id: 4, text: "Support each other in every situation, good or bad 🤝", checked: false },
    { id: 5, text: "Give each other strength to fulfill our dreams 💪", checked: false },
    { id: 6, text: "Celebrate small achievements and special moments together 🎉", checked: false },
    { id: 7, text: "Travel to new places and explore life side by side 🌍", checked: false },
    { id: 8, text: "Communicate openly and always understand each other 🗣️", checked: false },
    { id: 9, text: "Grow together emotionally, mentally, and spiritually 🌱", checked: false },
    { id: 10, text: "Always choose love, respect, and loyalty for each other ❤️", checked: false },
];

const GoalList = ({ onNext }) => {
    const [goals, setGoals] = useState(initialGoals);

    const toggleGoal = (id) => {
        const newGoals = goals.map(g => {
            if (g.id === id) {
                if (!g.checked) {
                    confetti({
                        particleCount: 30,
                        spread: 50,
                        origin: { y: 0.7 },
                        colors: ['#f43f5e', '#fda4af', '#ffe4e6']
                    });
                }
                return { ...g, checked: !g.checked };
            }
            return g;
        });
        setGoals(newGoals);
    };

    const allChecked = goals.every(g => g.checked);

    return (
        <div className="h-full w-full max-w-md mx-auto relative overflow-hidden">
            <div className="h-full w-full overflow-y-auto px-6 py-8 flex flex-col items-center no-scrollbar">
                <h2 className="text-4xl font-pacifico text-rose-600 mb-8 text-center shrink-0">
                    Our 2026 Goals ✨
                </h2>

                <div className="w-full space-y-4 mb-8">
                    {goals.map((goal, i) => (
                        <motion.div
                            key={goal.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => toggleGoal(goal.id)}
                            className="cursor-pointer"
                        >
                            <div className={clsx(
                                "flex items-center p-4 rounded-xl transition-all duration-300 border-2",
                                goal.checked
                                    ? "bg-rose-50 border-rose-200 shadow-inner"
                                    : "bg-white border-white shadow-lg hover:scale-102"
                            )}>
                                <div className={clsx(
                                    "w-8 h-8 rounded-full border-2 mr-4 flex items-center justify-center transition-colors shrink-0",
                                    goal.checked ? "bg-rose-500 border-rose-500" : "border-rose-200"
                                )}>
                                    {goal.checked && <Check size={18} className="text-white" />}
                                </div>
                                <span className={clsx(
                                    "font-nunito text-lg transition-colors",
                                    goal.checked ? "text-rose-300 line-through" : "text-gray-700"
                                )}>
                                    {goal.text}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: allChecked ? 1 : 0.5 }}
                    whileHover={allChecked ? { scale: 1.05 } : {}}
                    onClick={allChecked ? onNext : null}
                    className={clsx(
                        "px-8 py-3 rounded-full font-bold text-lg shadow-md transition-all shrink-0 mb-4",
                        allChecked
                            ? "bg-rose-500 text-white cursor-pointer"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                >
                    {allChecked ? "Continue 💕" : "Check them all first!"}
                </motion.button>

                {/* Spacer for bottom safe area */}
                <div className="h-4 shrink-0" />
            </div>
        </div>
    );
};

export default GoalList;
