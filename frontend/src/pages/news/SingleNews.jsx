import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { newsImgUrl } from '../../utils/newsImgUrl';

const SingleNews = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/news/${id}`)
      .then(res => res.json())
      .then(data => setNews(data))
      .catch(err => console.error("Error fetching single news:", err));
  }, [id]);

  if (!news) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 py-8">
      <h1 className='text-center ft underline text-3xl font-semibold '>{news.title}</h1>

      {/* Image Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {/* Main image */}
        <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-1">
          <img
            src={newsImgUrl(news.image1)}
            alt={news.title}
            className="w-full h-auto object-cover rounded shadow-sm"
          />
        </div>

        {/* Supporting images */}
        {[news.image2, news.image3, news.image4].map((img, idx) => (
          <div key={idx} className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
            <img
              src={newsImgUrl(img)}
              alt={`Supporting image ${idx + 2}`}
              className="w-full h-auto object-cover rounded shadow-sm"
            />
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div className=" mt-6 text-left">
        <p className="text-gray-800 text-base sm:text-lg md:text-xl leading-relaxed">
          {news.description}
        </p>
      </div>
    </div>
  );
};

export default SingleNews;
