import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const genres = [
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
  "Young Adult"
];

// Sample data: mapping genres to sample books
const booksByGenre = {
  Fiction: [
    { title: "Fiction Book 1", image: "https://via.placeholder.com/150" },
    { title: "Fiction Book 2", image: "https://via.placeholder.com/150" },
  ],
  "Non-Fiction": [
    { title: "Non-Fiction Book 1", image: "https://via.placeholder.com/150" },
    { title: "Non-Fiction Book 2", image: "https://via.placeholder.com/150" },
  ],
  Mystery: [
    { title: "Mystery Book 1", image: "https://via.placeholder.com/150" },
    { title: "Mystery Book 2", image: "https://via.placeholder.com/150" },
  ],
  Thriller: [
    { title: "Thriller Book 1", image: "https://via.placeholder.com/150" },
    { title: "Thriller Book 2", image: "https://via.placeholder.com/150" },
  ],
  Fantasy: [
    { title: "Fantasy Book 1", image: "https://via.placeholder.com/150" },
    { title: "Fantasy Book 2", image: "https://via.placeholder.com/150" },
  ],
  "Sci-Fi": [
    { title: "Sci-Fi Book 1", image: "https://via.placeholder.com/150" },
    { title: "Sci-Fi Book 2", image: "https://via.placeholder.com/150" },
  ],
  Romance: [
    { title: "Romance Book 1", image: "https://via.placeholder.com/150" },
    { title: "Romance Book 2", image: "https://via.placeholder.com/150" },
  ],
  Biography: [
    { title: "Biography Book 1", image: "https://via.placeholder.com/150" },
    { title: "Biography Book 2", image: "https://via.placeholder.com/150" },
  ],
  History: [
    { title: "History Book 1", image: "https://via.placeholder.com/150" },
    { title: "History Book 2", image: "https://via.placeholder.com/150" },
  ],
  "Self-Help": [
    { title: "Self-Help Book 1", image: "https://via.placeholder.com/150" },
    { title: "Self-Help Book 2", image: "https://via.placeholder.com/150" },
  ],
  "Young Adult": [
    { title: "Young Adult Book 1", image: "https://via.placeholder.com/150" },
    { title: "Young Adult Book 2", image: "https://via.placeholder.com/150" },
  ],
};

const Geners = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const selectedGenre = genres[value];
  const books = booksByGenre[selectedGenre] || [];

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
            "& .MuiTabs-indicator": {
              backgroundColor: "#c2410c", // Orange-700
            },
          }}
        >
          {genres.map((genre, index) => (
            <Tab
              key={index}
              label={genre}
              sx={{
                textTransform: "none",
                fontSize: { xs: "0.75rem", sm: "0.875rem", md: "1rem" },
                "&.Mui-selected": {
                  color: "#c2410c", // Orange-700 for selected tab
                },
              }}
              className="text-sm sm:text-base md:text-lg"
            />
          ))}
        </Tabs>
      </div>
      
      {/* Books Grid */}
      <div className="mt-8 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {selectedGenre} Books
        </h2>
        {books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {books.map((book, index) => (
              <div key={index} className="bg-white p-2 rounded-lg">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-32 object-cover rounded-md"
                />
                <h3 className="mt-2 text-sm font-semibold text-gray-800">
                  {book.title}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No books available for this genre.</p>
        )}
      </div>
    </div>
  );
};

export default Geners;
