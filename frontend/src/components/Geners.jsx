import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import BookCard from './BookCard/BookCard';

const genres = [
  "All", "Classic", "Fiction", "Non-Fiction", "Mystery", "Thriller", "Fantasy",
  "Sci-Fi", "Romance", "Biography", "History", "Self-Help", "Young Adult", "Horror"
];

const Genres = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

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
    setFilteredBooks(
      selectedGenre === "All"
        ? allBooks
        : allBooks.filter(book => book.genre === selectedGenre)
    );
    setVisibleCount(8);
  }, [selectedGenre, allBooks]);

  const handleGenreChange = (event, newValue) => setSelectedGenre(newValue);
  const loadMore = () => setVisibleCount(prev => prev + 4);

  return (
    <div className="mt-8 px-4">
      {/* Page Title */}
      <h4 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
        Genres
      </h4>

      {/* Centered Genre Tabs */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <div className="w-full max-w-4xl">
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
      </div>

      {/* Centered Books Grid */}
      <div className="max-w-6xl mx-auto mt-8">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredBooks.slice(0, visibleCount).map((book, index) => (
              <BookCard key={index} data={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No books available for this genre.</p>
        )}
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

export default Genres;
