import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Pagination from "@mui/material/Pagination";

const genres = [
  "All", "Classic", "Fiction", "Non-Fiction", "Mystery", "Thriller", "Fantasy",
  "Sci-Fi", "Romance", "Biography", "History", "Self-Help", "Young Adult", "Horror"
];

const BooksPerPage = 8;

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/book/allbooks/?page=${currentPage}&limit=${BooksPerPage}`
        );
        setAllBooks(response.data.books);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [currentPage]);

  // Filter books by genre
  const filteredBooks = selectedGenre === "All"
    ? allBooks
    : allBooks.filter(book => book.genre === selectedGenre);

  // Sort books
  const sortedBooks = (() => {
    let books = [...filteredBooks];
    if (sortOption === "priceLow") return books.sort((a, b) => a.price - b.price);
    if (sortOption === "priceHigh") return books.sort((a, b) => b.price - a.price);
    if (sortOption === "rating") return books.sort((a, b) => b.rating - a.rating);
    if (sortOption === "newest") return books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return books;
  })();

  const handleGenreChange = (event, newValue) => {
    setSelectedGenre(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mt-8 px-4 overflow-x-hidden">
      <h4 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
        All Books
      </h4>
      
      {/* Tabs + Sort */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Genre Tabs (Scrollable on small screens) */}
        <div className="max-w-full overflow-x-auto whitespace-nowrap">
          <Tabs
            value={selectedGenre}
            onChange={handleGenreChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ "& .MuiTabs-indicator": { backgroundColor: "#c2410c" } }}
          >
            {genres.map((genre, i) => (
              <Tab
                key={i}
                label={genre}
                value={genre}
                sx={{
                  textTransform: "none",
                  "&.Mui-selected": { color: "#c2410c" }
                }}
                className="text-xs sm:text-sm md:text-base"
              />
            ))}
          </Tabs>
        </div>

        {/* Sort Dropdown */}
        <select
          className="border border-gray-300 px-3 py-2 rounded-md focus:ring-orange-500 w-full sm:w-auto"
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Books Grid */}
      <div className="max-w-6xl mx-auto mt-8 mb-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : sortedBooks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {sortedBooks.map((book, i) => (
              <BookCard key={i} data={book} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No books available for this genre.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            sx={{
              "& .MuiPaginationItem-root": { color: "#f97316" },
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#f97316",
                color: "#fff",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AllBooks;
