import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BookCard = ({ data }) => {
  return (
    <motion.div 
      className="p-3 rounded-md border border-[#5D0E41] border-l-4 border-b-4 transition duration-300 mx-auto w-full max-w-[16rem]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`/book/${data._id}`}>
        {/* Book Cover with Hover Effect */}
        <motion.img
          src={data.image || data.images?.[0] || 'https://via.placeholder.com/150'}
          alt={data.title}
          className="w-full object-cover rounded-md mb-2 aspect-[3/4] max-h-60 transition-transform duration-300 hover:scale-105"
        />

        {/* Title & Author (Wrapped Inside Container but No Hover Effect) */}
        <div className="text-start p-2">
          <h3 className="text-lg font-semibold text-[#5D0E41]">
            {data.title}
          </h3>
          <p className="text-md text-gray-700">
            {data.author}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
