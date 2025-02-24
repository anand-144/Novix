import React from 'react';

const Featured = () => {
  // Example featured books (replace these with actual data)
  const featuredBooks = [
    {
      title: "Book Title 1",
      author: "Author 1",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Book Title 2",
      author: "Author 2",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Book Title 3",
      author: "Author 3",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Book Title 4",
      author: "Author 4",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <section className="py-10 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
          Featured Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book, index) => (
            <div key={index} className="bg-white rounded-lg p-4">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600 mt-2">{book.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
