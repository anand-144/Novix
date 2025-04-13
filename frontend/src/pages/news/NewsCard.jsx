import React from 'react';
import { Link } from 'react-router-dom';
import { newsImgUrl } from '../../utils/newsImgUrl';

const NewsCard = ({ news }) => {
  return (
    <div className="w-full sm:w-[28rem] h-36 rounded-lg border p-4 flex items-center justify-between bg-white overflow-hidden">
      {/* Text Section */}
      <div className="flex-1 pr-4">
        <Link to={`/news/${news?._id || news?.id}`}>
          <h3 className="text-lg font-semibold hover:text-blue-600 mt-1">
            {news?.title}
          </h3>
        </Link>
        <p className="text-gray-600 text-sm line-clamp-4">
          {news?.description}
        </p>
      </div>

      {/* Image Section */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded">
        <img
          src={newsImgUrl(news?.image1)}
          alt={news?.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default NewsCard;
