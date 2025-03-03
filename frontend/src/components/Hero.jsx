import React from 'react';
import { hero } from '../assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.3 } 
  }
};

const leftVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

const rightVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

const Hero = () => {
  return (
    <motion.div 
      className="relative min-h-[80vh] flex flex-col md:flex-row items-center justify-center bg-[#F4F5DB]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Column */}
      <motion.div 
        className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-10 md:py-0"
        variants={leftVariants}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#5D0E41] leading-tight">
          Unlock Your Next <span className="text-[#9B1B30]">Epic Reading</span> Adventure
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 max-w-lg leading-relaxed">
          Uncover the stories that captivate, inspire, and transform your perspective.
        </p>
        <div className="mt-8">
          <Link to="/allbooks">
            <motion.button 
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#5D0E41] text-white text-sm sm:text-base font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-[#9B1B30] transition-all duration-300"
            >
              Discover Your Next Great Book
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Right Column */}
      <motion.div 
        className="relative z-10 w-full md:w-1/2 flex items-center justify-center p-4"
        variants={rightVariants}
      >
        <motion.img
          src={hero}
          alt="Hero"
          className="w-full h-auto max-h-[65vh] object-cover drop-shadow-lg rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
