import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
    const hearts = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            scale: 0.5 + Math.random() * 1,
            duration: 15 + Math.random() * 25,
            delay: Math.random() * 10,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute bottom-[-50px] text-pink-200/40 text-4xl"
                    initial={{ y: 0, x: `${heart.x}vw`, scale: heart.scale, opacity: 0 }}
                    animate={{
                        y: '-120vh',
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 45, -45, 0],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                        ease: "linear",
                    }}
                >
                    ❤️
                </motion.div>
            ))}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-pink-50/50 to-transparent" />
        </div>
    );
};

export default FloatingHearts;
