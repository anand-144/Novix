import React from 'react';
import { useLocation } from 'react-router-dom';
import BookCard from '../pages/books/BookCard';

const SearchResults = () => {
    const location = useLocation();
    const { results = [], keyword = "" } = location.state || {};

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-6">
                Search Results for "{keyword}"
            </h2>

            {results.length === 0 ? (
                <p>No books found.</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
