import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from './BookCard/BookCard';

const Featured = () => {
  const [books, setBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/allbooks/`);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchAllBooks();
  }, []);

  const highRatedBooks = books.filter((book) => book.rating >= 3.5);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-8 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
          Featured Books
        </h2>
        {highRatedBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
              {highRatedBooks.slice(0, visibleCount).map((book, index) => (
                <BookCard key={index} data={book} />
              ))}
            </div>
            {highRatedBooks.length > visibleCount && (
              <div className="mt-6 flex justify-center">
                <button 
                  onClick={loadMore}
                  className="px-6 py-2 border border-orange-500 text-orange-700 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-600">No high-rated books available.</p>
        )}
      </div>
    </section>
  );
};

export default Featured;
