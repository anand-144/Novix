import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const genres = [
  "All", "Classic", "Fiction", "Non-Fiction", "Mystery", "Thriller", "Fantasy",
  "Sci-Fi", "Romance", "Biography", "History", "Self-Help", "Young Adult", "Horror"
];

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/allbooks/`);
        setAllBooks(response.data.books);
        setFilteredBooks(response.data.books);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    let books = selectedGenre === "All" ? allBooks : allBooks.filter(book => book.genre === selectedGenre);

    // Sorting logic
    if (sortOption === "priceLow") books.sort((a, b) => a.price - b.price);
    if (sortOption === "priceHigh") books.sort((a, b) => b.price - a.price);
    if (sortOption === "rating") books.sort((a, b) => b.rating - a.rating);
    if (sortOption === "newest") books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredBooks(books);
    setVisibleCount(8);
  }, [selectedGenre, allBooks, sortOption]);

  const handleGenreChange = (event, newValue) => setSelectedGenre(newValue);
  const loadMore = () => setVisibleCount(prev => prev + 4);

  if (loading) {
    return (
      <div className="mt-8 px-4 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mt-8 px-4">
      {/* Page Title */}
      <h4 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
        All Books
      </h4>

      {/* Genre Tabs & Sort Dropdown */}
      <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Genre Tabs (Left-Aligned) */}
        <div className="w-full sm:w-3/4">
          <Tabs
            value={selectedGenre}
            onChange={handleGenreChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ "& .MuiTabs-indicator": { backgroundColor: "#c2410c" } }}
          >
            {genres.map((genre, index) => (
              <Tab
                key={index}
                label={genre}
                value={genre}
                sx={{
                  textTransform: "none",
                  fontSize: { xs: "0.7rem", sm: "0.875rem", md: "1rem" },
                  "&.Mui-selected": { color: "#c2410c" }
                }}
                className="text-xs sm:text-sm md:text-base"
              />
            ))}
          </Tabs>
        </div>

        {/* Sort Dropdown (Right-Aligned) */}
        <div className="w-full sm:w-1/4 flex justify-end">
          <select
            className="border border-gray-300 px-3 py-2 rounded-md text-xs sm:text-sm md:text-base focus:ring-orange-500 focus:border-orange-500 w-full sm:w-auto"
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center mt-8">
        {filteredBooks.slice(0, visibleCount).map((book, index) => (
          <BookCard key={index} data={book} />
        ))}
      </div>

      {/* Load More Button */}
      {filteredBooks.length > visibleCount && (
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
  );
};

export default AllBooks;
