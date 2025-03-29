import React, { useEffect, useState } from 'react';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const TopSeller = () => {
    const [books, setBooks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    useEffect(() => {
        fetch("/book.json")
            .then(res => res.json())
            .then((data) => setBooks(data))
    }, []);

    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(books => books.category === selectedCategory.toLowerCase())

    console.log(filteredBooks)
    console.log(books)

    return (
        <div className='px-6 md:px-12 py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>

            {/*Category*/}

            <div className='mb-8 flex items-center'>
                <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                name="category" id="category" className='border bg-[#eaeaea] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))
                    }
                </select>
            </div>

            {/* Book List */}

            {
                filteredBooks.map((book , index) => (
                    <div>{book.title}</div>
                ))
            }

        </div>
    );
};

export default TopSeller;
