import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download } from 'lucide-react';
import { portfolioData } from '../mock';

const HeroSection = ({ onScrollToProjects }) => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'مطور مواقع ويب وتطبيقات أندرويد';

  useEffect(() => {
    let index = 0;
    const typingTimer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, 100);

    return () => clearInterval(typingTimer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        {/* Profile Image */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
          >
            <img
              src={portfolioData.owner.image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight"
        >
          مرحباً
        </motion.h1>

        {/* Typed Title */}
        <motion.div
          variants={itemVariants}
          className="mb-6 h-16"
        >
          <h2 className="text-2xl md:text-4xl text-gray-300 font-light">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="ml-1"
            >
              |
            </motion.span>
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {portfolioData.owner.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onScrollToProjects}
            className="bg-white text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-2 space-x-reverse"
          >
            <span>استعرض أعمالي</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-white hover:text-black transition-all duration-200 flex items-center space-x-2 space-x-reverse"
          >
            <Download size={20} />
            <span>تحميل السيرة الذاتية</span>
          </motion.button>
        </motion.div>

        {/* Skills Tags */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {portfolioData.owner.skills.map((skill, index) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-white/10 text-white rounded-full text-sm border border-white/20 backdrop-blur-sm"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="cursor-pointer"
          onClick={onScrollToProjects}
        >
          <ChevronDown size={32} className="text-white/60 hover:text-white transition-colors" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;