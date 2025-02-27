import React from 'react';
import { hero } from '../assets';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.3 
    }
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
      className="min-h-[75vh] flex flex-col md:flex-row bg-gradient-to-r from-gray-50 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Left Column */}
      <motion.div 
        className="w-full md:w-1/2 flex flex-col justify-center px-6 py-8 md:py-0"
        variants={leftVariants}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-700 text-start mb-6">
          Unlock Your Next Epic Reading Adventure
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-lg">
          Uncover the stories that captivate, inspire, and transform your perspective.
        </p>
        <div className="mt-6">
          <Link to="/allbooks">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block border border-orange-500 text-sm sm:text-base font-medium text-orange-700 px-6 py-3 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Discover Your Next Great Book
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Right Column */}
      <motion.div 
        className="w-full md:w-1/2 flex items-center justify-center p-4"
        variants={rightVariants}
      >
        <motion.img
          src={hero}
          alt="Hero"
          className="w-full h-auto max-h-[75vh] object-cover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
