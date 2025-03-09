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
        const wishlistResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/wishlist/get-wishlist/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const wishlistBooks = wishlistResponse.data.data || [];
        setWishlistBooks(wishlistBooks);

        if (wishlistBooks.length === 0) {
          setLoading(false);
          return;
        }

        // Extract unique genres from wishlist
        const wishlistGenres = [...new Set(wishlistBooks.map(book => book.genre))];

        // Fetch all books
        const allBooksResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/allbooks/`);
        const allBooks = allBooksResponse.data.books || [];

        // Filter books that match wishlist genres but are NOT already in the wishlist
        const recommendedBooks = allBooks.filter(book => 
          wishlistGenres.includes(book.genre) && 
          !wishlistBooks.some(wishlistBook => wishlistBook._id === book._id)
        );

        setRecommendedBooks(recommendedBooks);
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

        {loading ? (
          <p className="text-center text-gray-700 text-lg">Loading recommendations...</p>
        ) : recommendedBooks.length > 0 ? (
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
