import React, { useState, useEffect } from 'react';
import { newsImgUrl } from '../../utils/newsImgUrl';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch("/news.json")
            .then(res => res.json())
            .then((data) => setNews(data))
            .catch(error => console.error("Error fetching news:", error));
    }, []);

    return (
        <div className='px-6 md:px-12 py-16'>
            <h2 className='text-3xl font-semibold'>News</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
               
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 40 },
                    1024: { slidesPerView: 2, spaceBetween: 50 },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                {news.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                            {/* Content */}
                            <div className='py-4'>
                                <Link to="/">
                                    <h3 className='text-lg font-medium hover:text-blue-500 mb-4'>{item?.title}</h3>
                                </Link>

                                <div className='w-10 bg-primary h-[4px] mb-5'></div>
                                <p className='text-sm text-gray-600'>{item?.description}</p>
                            </div>

                            {/* Image */}

                            <div className='w-30 h-40 flex-shrink-0'>
                                <img src={newsImgUrl(item.image)} alt={item.title} className='w-full h-full object-cover rounded-md' />
                            </div>


                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default News;
