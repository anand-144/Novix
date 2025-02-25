import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard/BookCard';

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/recentbooks/`);
        // Calculate the start of the current week (Monday)
        const now = new Date();
        const day = now.getDay(); // Sunday = 0, Monday = 1, etc.
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        const monday = new Date(now.setDate(diff));
        monday.setHours(0, 0, 0, 0);

        const recentBooks = response.data.books.filter(book => {
          const createdDate = new Date(book.createdAt);
          return createdDate >= monday;
        });

        setData(recentBooks);
        console.log("Fetched Recent Books:", recentBooks);
      } catch (error) {
        console.error("Error fetching recent books:", error);
      }
    };

    fetchData();
  }, []);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
          Recently Added
        </h2>
        {data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {data.slice(0, visibleCount).map((item, index) => (
              <BookCard key={index} data={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No recent books available.</p>
        )}
        {data.length > 4 && data.length > visibleCount && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-2 border border-orange-500 text-orange-700 rounded-full hover:bg-orange-500 hover:text-white transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAdded;
