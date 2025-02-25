import React from 'react';
import { hero } from '../assets';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="min-h-[75vh] flex flex-col md:flex-row bg-gradient-to-r from-gray-50 to-white">
      {/* Left Column */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-8 md:py-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-700 leading-tight">
          Unlock Your Next Epic Reading Adventure
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 max-w-lg">
          Uncover the stories that captivate, inspire, and transform your perspective.
        </p>
        <div className="mt-6">
          <Link to="/allbooks">
            <button className="inline-block border border-orange-500 text-sm sm:text-base font-medium text-orange-700 px-6 py-3 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105 cursor-pointer">
              Discover Your Next Great Book
            </button>
          </Link>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <img
          src={hero}
          alt="Hero"
          className="w-full h-auto max-h-[75vh] object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default Hero;
