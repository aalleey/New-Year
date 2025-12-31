import React from 'react';
import { motion } from 'framer-motion';

// Importing images from assets
import img1 from '../assets/IMG-20251219-WA0001.jpg';
import img2 from '../assets/IMG-20251219-WA0003.jpg';
import img3 from '../assets/IMG-20251220-WA0002.jpg';
import img4 from '../assets/IMG-20251221-WA0000.jpg';
import img5 from '../assets/IMG-20251223-WA0006.jpg';
import img6 from '../assets/IMG-20251223-WA0009.jpg';
import img7 from '../assets/IMG-20251230-WA0007.jpg';
import img8 from '../assets/Snapchat-493753899.jpg';

const photos = [
    { id: 1, url: img1, caption: 'So gorgeous ❤️', rotate: -6 },
    { id: 2, url: img2, caption: 'My Queen 👑', rotate: 4 },
    { id: 3, url: img3, caption: 'That smile! 😍', rotate: -3 },
    { id: 4, url: img4, caption: 'Perfection 💖', rotate: 7 },
    { id: 5, url: img5, caption: 'My Cutie 🧸', rotate: -5 },
    { id: 6, url: img6, caption: 'Prettiest ✨', rotate: 3 },
    { id: 7, url: img7, caption: 'My Angel 👼', rotate: -4 },
    { id: 8, url: img8, caption: 'My World 🌍', rotate: 6 },
];

const PhotoGallery = ({ onNext }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 h-full w-full max-w-md mx-auto overflow-hidden">
            <h2 className="text-4xl font-pacifico text-rose-600 mb-8 z-10 text-center leading-tight">
                The Prettiest Girl 🌹
            </h2>

            <div className="relative w-full h-[500px] flex items-center justify-center">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        drag
                        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{
                            scale: 1,
                            rotate: photo.rotate,
                            y: (index % 2 === 0 ? -1 : 1) * (Math.random() * 20),
                            x: (index % 3 === 0 ? -1 : 1) * (Math.random() * 20)
                        }}
                        transition={{ type: "spring", delay: index * 0.1 }}
                        className="absolute bg-white p-3 shadow-xl rounded-sm w-[160px] sm:w-[180px] hover:z-50 cursor-grab active:cursor-grabbing"
                        style={{ zIndex: index }}
                    >
                        <div className="aspect-[3/4] w-full bg-gray-200 mb-2 overflow-hidden">
                            <img src={photo.url} alt="Memory" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-pacifico text-xs sm:text-sm text-center text-gray-600 rotate-1">
                            {photo.caption}
                        </p>
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="mt-8 px-8 py-3 bg-rose-500 text-white rounded-full font-bold shadow-lg z-10"
            >
                See More ❤️
            </motion.button>
        </div>
    );
};

export default PhotoGallery;
