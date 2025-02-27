import React from 'react';
import { motion } from 'framer-motion';
import {Link} from 'react-router-dom'
import aboutUs from '../assets/about-us.png';
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-50 via-white to-orange-50 flex flex-col items-center p-8">
      {/* Centered Header */}
      <h1 className="text-5xl font-bold text-orange-700 mb-10 text-center">
        About Novix
      </h1>

      {/* Two-column layout */}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center">
        {/* Left Column: Text and Button */}
        <div className="md:w-1/2 p-4 flex flex-col justify-center space-y-4">
          <p className="text-xl text-gray-700">
            At Noivx, we believe that every book has the power to transform lives. We curate a diverse collection of timeless classics and modern bestsellers that inspire, educate, and entertain.
          </p>
          <p className="text-xl text-gray-700">
            Our mission is to create an engaging reading experience that connects people with stories that resonate and empower them. Discover your next great read with us.
          </p>
        <Link to="/allbooks">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-orange-500 text-white font-bold rounded shadow-md hover:bg-orange-600 transition-colors"
          >
            Explore Our Collection
          </motion.button>
          </Link>
        </div>

        {/* Right Column: Image */}
        <div className="md:w-1/2 p-4">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src={aboutUs} 
              alt="Book Haven"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
