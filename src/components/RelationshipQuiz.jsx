import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const questions = [
    {
        id: 1,
        question: "Our First Talk? ",
        options: ["20 November", "25 December", "15 December", "22 November"],
        correctAnswer: "22 November" // Change this to the real answer!
    },
    {
        id: 2,
        question: "Who said 'I love you' first? 🗣️",
        options: ["You did!", "I did!", "We said it together"],
        correctAnswer: "I did!" // Change this!
    },
    {
        id: 3,
        question: "What makes me smile the most? 😊",
        options: ["Good Food", "You ❤️", "Sleeping", "Money"],
        correctAnswer: "You ❤️" // Cute default answer
    }
];

const RelationshipQuiz = ({ onNext }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [shake, setShake] = useState(false);

    const handleAnswer = (option) => {
        if (option === questions[currentQuestion].correctAnswer) {
            // Correct!
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#4ade80', '#a7f3d0'] // Green success tones
            });

            if (currentQuestion < questions.length - 1) {
                setTimeout(() => setCurrentQuestion(currentQuestion + 1), 800);
            } else {
                setTimeout(() => setIsCompleted(true), 800);
            }
        } else {
            // Wrong!
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto p-6 relative">
            <h2 className="text-3xl font-pacifico text-rose-600 mb-8 text-center">
                How well do you know us? ❓
            </h2>

            <div className="w-full bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-2 border-pink-100 min-h-[300px] flex flex-col justify-center relative overflow-hidden">
                <AnimatePresence mode="wait">
                    {!isCompleted ? (
                        <motion.div
                            key={currentQuestion}
                            initial={{ x: 50, opacity: 0 }}
                            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full text-center"
                        >
                            <h3 className="text-xl font-nunito font-bold text-slate-700 mb-6">
                                {questions[currentQuestion].question}
                            </h3>

                            <div className="grid gap-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.02, backgroundColor: "#fff1f2" }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAnswer(option)}
                                        className="w-full p-4 bg-white border-2 border-rose-100 rounded-xl text-slate-600 font-bold shadow-sm hover:border-rose-300 transition-colors"
                                    >
                                        {option}
                                    </motion.button>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-center gap-1">
                                {questions.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-2 w-2 rounded-full transition-colors ${i === currentQuestion ? 'bg-rose-500' : 'bg-rose-200'}`}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="text-6xl mb-4">🏆</div>
                            <h3 className="text-2xl font-pacifico text-rose-600 mb-2">
                                You passed!
                            </h3>
                            <p className="text-slate-600 mb-6">
                                You know us perfectly. 🥰
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onNext}
                                className="px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-lg"
                            >
                                Continue ❤️
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default RelationshipQuiz;
