import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from './BookCard/BookCard';

const Recommendation = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistAndRecommend = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Fetch wishlist books
        const wishlistResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/wishlist/get-wishlist/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const wishlistBooks = wishlistResponse.data.books;
        setWishlistBooks(wishlistBooks);

        if (wishlistBooks.length > 0) {
          // Extract unique genres from wishlist
          const genres = [...new Set(wishlistBooks.map(book => book.genre))];

          // Fetch recommended books based on these genres
          const recommendedResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/allbooks/`);
          const recommendedBooks = recommendedResponse.data.books.filter(book => genres.includes(book.genre));

          setRecommendedBooks(recommendedBooks);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
        setLoading(false);
      }
    };

    fetchWishlistAndRecommend();
  }, []);

  return (
    <section className="py-16 px-6 bg-[#F4F5DB]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold text-start mb-12 text-[#5D0E41]">
          <span className="bg-gradient-to-r from-[#5D0E41] to-[#9B1B30] bg-clip-text text-transparent">
            Recommended For You
          </span>
        </h2>

        {recommendedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {recommendedBooks.map((book, index) => (
              <BookCard key={index} data={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700 text-lg">
            No recommendations available. Add books to your wishlist to get recommendations!
          </p>
        )}
      </div>
    </section>
  );
};

export default Recommendation;
