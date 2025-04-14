import React, { useState } from 'react';
import BookCard from '../books/BookCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = [
  "Choose a genre",
  "Action and Adventure",
  "Art",
  "Autobiography",
  "Biography",
  "Business",
  "Children's",
  "Classic",
  "Comics",
  "Cookbooks",
  "Crime",
  "Drama",
  "Dystopian",
  "Education",
  "Fantasy",
  "Fiction",
  "Graphic Novel",
  "Historical Fiction",
  "History",
  "Horror",
  "Humor",
  "Literary Fiction",
  "Memoir",
  "Mystery",
  "Non-fiction",
  "Paranormal",
  "Philosophy",
  "Poetry",
  "Psychology",
  "Religion",
  "Romance",
  "Science",
  "Science Fiction",
  "Self-help",
  "Short Stories",
  "Spirituality",
  "Sports",
  "Supernatural",
  "Thriller",
  "Travel",
  "True Crime",
  "Western",
  "Young Adult"
];

const cloudinaryBaseUrl = "https://res.cloudinary.com/dxunfwkpp/image/upload/v1/";

const TopSeller = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();

  // Filter books by selected category
  const filteredBooks = selectedCategory === "Choose a genre"
    ? books
    : books.filter(book => book.category.toLowerCase() === selectedCategory.toLowerCase());

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching books</div>;

  return (
    <div className='px-6 md:px-12 py-10'>
      <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>

      {/* Category Select */}
      <div className='mb-8 flex items-center'>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className='border bg-[#eaeaea] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Swiper */}
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
        {filteredBooks.length > 0 && filteredBooks.map((book, index) => (
          <SwiperSlide key={index}>
            <BookCard book={book} cloudinaryBaseUrl={cloudinaryBaseUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopSeller;
