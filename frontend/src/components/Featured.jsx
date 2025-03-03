import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard/BookCard';

const Featured = () => {
  const [books, setBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Initially show 5 books

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/allbooks/`);
        const highRatedBooks = response.data.books.filter(book => book.rating >= 3.5);
        setBooks(highRatedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const showMoreBooks = () => setVisibleCount(prev => prev + 5);

  return (
    <section className="py-16 px-6 bg-[#F4F5DB]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl font-medium text-start mb-12 text-[#722F37]">
          <span className="bg-gradient-to-r from-[#722F37] to-[#94404B] bg-clip-text text-transparent">
            FEATURED - Curated For You
          </span>
        </h2>

        {/* Featured Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {books.slice(0, visibleCount).map((book, index) => (
            <BookCard key={index} data={book} />
          ))}
        </div>

        {/* View More Button */}
        {visibleCount < books.length && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={showMoreBooks}
              className="px-6 py-2 border-2 border-[#722F37] border-l-4 border-b-4 text-[#722F37] rounded-sm 
          hover:bg-[#722F37] hover:text-[#F4F5DB] 
          hover:border-black hover:border-l-4 hover:border-b-4 
          transition-all duration-300"
            >
              View More
            </button>
          </div>

        )}
      </div>
    </section>
  );
};

export default Featured;
