import React from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

// Define the Cloudinary base URL here
const cloudinaryBaseUrl = "https://res.cloudinary.com/dxunfwkpp/image/upload/v1/";

const Recommendation = () => {
  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching books</div>;

  return (
    <div className='px-6 md:px-12 py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Top Recommendation</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 40 },
          1024: { slidesPerView: 2, spaceBetween: 50 },
          1180: { slidesPerView: 3, spaceBetween: 50 },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {books.length > 0 &&
          books.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} cloudinaryBaseUrl={cloudinaryBaseUrl} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Recommendation;
