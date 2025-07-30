import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        >
          <div className="text-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4"
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-2xl font-bold text-white">S</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl font-bold text-white mb-2 tracking-wider"
            >
              صبره سوفت
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-gray-400 mb-8 text-lg"
            >
              تطوير البرمجيات والتطبيقات
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-48 h-1 bg-gray-800 rounded-full mx-auto overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-white via-gray-300 to-white rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Progress Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1 }}
              className="text-gray-500 mt-4 text-sm"
            >
              {progress}%
            </motion.p>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    y: -100,
                    x: [0, Math.random() * 100 - 50]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut"
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: 0
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;