import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const BookCard = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 hover:shadow-2xl transition transform duration-300 hover:scale-105 mx-auto">
      <Link to={`/book/${data._id}`}>
        {/* Title and Rating Container */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-base md:text-lg font-semibold text-orange-700">
            {data.title}
          </h3>
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="text-sm md:text-base text-green-600">{data.rating}</span>
          </div>
        </div>
        <img
          src={data.image || data.images?.[0] || 'https://via.placeholder.com/150'}
          alt={data.title}
          className="w-full object-cover rounded-md mb-4 aspect-[3/4] max-h-72"
        />
        <p className="text-sm md:text-base text-gray-600 text-left">
          Author: {data.author}
        </p>
        <p className="text-sm md:text-base text-gray-600 text-left">
          Genre: {data.genre}
        </p>
      </Link>
    </div>
  );
};

export default BookCard;
