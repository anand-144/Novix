import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard/BookCard';
import Loader from './Loader/Loader';

const RecentlyAdded = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/recentbooks/`);

        // Get today's date & calculate date range (last 7 days)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        // Filter books that were added in the last 7 days
        const recentBooks = response.data.books.filter(book => {
          const createdDate = new Date(book.createdAt);
          return createdDate >= sevenDaysAgo && createdDate <= today;
        });

        setBooks(recentBooks);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recent books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-16 px-6 bg-[#F4F5DB]">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl sm:text-5xl font-semibold text-start mb-12 text-[#5D0E41]">
          <span className="bg-gradient-to-r from-[#5D0E41] to-[#9B1B30] bg-clip-text text-transparent">
            Recently Added - Books You’ll Love
          </span>
        </h2>

        {/* Books Grid */}
        {loading ? (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
            {books.map((book, index) => (
              <BookCard key={index} data={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg">No books added in the last 7 days.</p>
        )}
      </div>
    </section>
  );
};

export default RecentlyAdded;
