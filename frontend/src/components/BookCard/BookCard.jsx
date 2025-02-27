import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const BookCard = ({ data }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl p-1 md:p-2 hover:shadow-lg transition transform duration-300 hover:scale-105 mx-auto w-full max-w-[16rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/book/${data._id}`}>
        {/* Title and Rating Container */}
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-xs md:text-lg font-semibold text-orange-700">
            {data.title}
          </h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="text-md md:text-xs text-green-600">{data.rating}</span>
          </div>
        </div>
        <img
          src={data.image || data.images?.[0] || 'https://via.placeholder.com/150'}
          alt={data.title}
          className="w-full object-cover rounded-md mb-2 aspect-[3/4] max-h-60"
        />
        <p className="text-md md:text-xs text-gray-600 text-left">
          Author: {data.author}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-md md:text-xs text-gray-600">
            Genre: {data.genre}
          </p>
          <p className="text-md md:text-xs text-gray-600">
            ₹ {data.price}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
