import React from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { getAuth } from 'firebase/auth';  // Import Firebase auth
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify correctly

// Import Toastify styles
import 'react-toastify/dist/ReactToastify.css';

const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    const dispatch = useDispatch();

    // Get the current user's email from Firebase
    const userEmail = getAuth().currentUser?.email;

    const handleAddToCart = (product) => {
        if (userEmail) {
            dispatch(addToCart({ userEmail, item: product }));
            // Show toast notification for successful add
            toast.success(`${product.title} added to cart!`);
        } else {
            // Show toast notification if the user is not logged in
            toast.error("Please log in to add items to the cart.");
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error happened while loading book info</div>;

    return (
        <div className='flex justify-center px-4'>
            <div className="max-w-lg shadow-md shadow-slate-600 rounded-lg p-4">
                <h1 className="text-2xl font-bold mb-4 text-center underline">{book?.title}</h1>

                <div>
                    <div className='flex justify-between gap-4 rounded-lg'>
                        <img
                            src={book?.coverImage || 'defaultCoverImage.jpg'}  // Use default image if not available
                            alt="Cover"
                            className="w-1/2 h-auto max-h-[320px] object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                        <img
                            src={book?.backImage || 'defaultBackImage.jpg'}  // Use default image if not available
                            alt="Back"
                            className="w-1/2 h-auto max-h-[320px] object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </div>

                    <div className='mb-5'>
                        <p className="text-gray-700 mb-2"><strong>Author:</strong> {book?.author || 'Unknown'}</p>
                        <p className="text-gray-700 mb-3">
                            <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString() || 'N/A'}
                        </p>
                        <p className="text-gray-700 mb-3 capitalize">
                            <strong>Category:</strong> {book?.category || 'N/A'}
                        </p>
                        <p className="text-gray-700 font-semibold mb-1"><strong>Description:</strong></p>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {book?.description
                                ? book.description
                                    .split(/\r?\n|\. |; | - /) // You can adjust this regex to fit your description format
                                    .filter(point => point.trim() !== ' ')
                                    .map((point, index) => (
                                        <li key={index}>{point.trim()}</li>
                                    ))
                                : <li>No description available.</li>
                            }
                        </ul>

                    </div>

                    {/* Price and Add to Cart in same line */}
                    <div className="flex justify-between items-center mt-3">
                        <p className="text-gray-700">
                            <strong>Price: ₹</strong> {book?.newPrice || 'N/A'}
                        </p>
                        <button
                            onClick={() => handleAddToCart(book)}
                            className="btn-primary px-6 py-2 flex items-center gap-1 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-all duration-300"
                        >
                            <FiShoppingCart />
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast container */}
            <ToastContainer />
        </div>
    );
};

export default SingleBook;
