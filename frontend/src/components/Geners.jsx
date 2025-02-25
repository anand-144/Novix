import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import axios from 'axios';
import BookCard from './BookCard/BookCard';

const genres = [
  "Classic",
  "Fiction",
  "Non-Fiction",
  "Mystery",
  "Thriller",
  "Fantasy",
  "Sci-Fi",
  "Romance",
  "Biography",
  "History",
  "Self-Help",
  "Young Adult",
  "Horror"
];

const Genres = () => {
  const [value, setValue] = useState(0);
  const [allBooks, setAllBooks] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/book/allbooks/`);
        setAllBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setVisibleCount(4);
  };

  const selectedGenre = genres[value];
  const filteredBooks = allBooks.filter(book => book.genre === selectedGenre);

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  return (
    <div className="px-4 py-4 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
        Genres
      </h1>
      <div className="w-full max-w-4xl">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#c2410c" },
          }}
        >
          {genres.map((genre, index) => (
            <Tab
              key={index}
              label={genre}
              sx={{
                textTransform: "none",
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                "&.Mui-selected": { color: "#c2410c" },
              }}
              className="text-sm sm:text-base md:text-lg"
            />
          ))}
        </Tabs>
      </div>
      
      <div className="mt-8 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          {selectedGenre} Books
        </h2>
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredBooks.slice(0, visibleCount).map((book, index) => (
              <BookCard key={index} data={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No books available for this genre.</p>
        )}
        {filteredBooks.length > 4 && filteredBooks.length > visibleCount && (
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
    </div>
  );
};

export default Genres;
