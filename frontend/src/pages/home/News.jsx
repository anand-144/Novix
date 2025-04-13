import React, { useState, useEffect } from 'react';
import NewsCard from '../news/NewsCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/news`)
      .then(res => res.json())
      .then(data => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const latestNews = data.filter(item => {
          const newsDate = new Date(item.createdAt || item.date);
          return newsDate >= oneWeekAgo;
        });

        setNews(latestNews);
      })
      .catch(err => console.error("Error fetching news:", err));
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-12 py-8 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 md:mb-6">Latest Articles</h2>
      <Swiper
        navigation={true}
        slidesPerView={1}
        spaceBetween={8}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 8 },
          640: { slidesPerView: 1, spaceBetween: 12 },
          768: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 16 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <NewsCard news={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
