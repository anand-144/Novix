import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';

import { Pagination , Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from './books/BookCard';

const Recommendation = () => {
     const [books, setBooks] = useState([]);
    
        useEffect(() => {
            fetch("/book.json")
                .then(res => res.json())
                .then((data) => setBooks(data))
        }, []);
  return (
    <div className='px-6 md:px-12 py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>

        <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
             
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination,Navigation]}
                className="mySwiper"
            >

                {
                    books.length > 0 && books.slice(8, 18).map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>
                    ))
                }


            </Swiper>

    </div>
  )
}

export default Recommendation