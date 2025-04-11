import React from 'react'
import { FiShoppingCart } from "react-icons/fi"
import { useParams } from "react-router-dom"
import { getImgUrl } from '../../utils/getImgUrl';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';


const SingleBook = () => {
    const { id } = useParams();
    const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
    console.log(book)

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart({ userEmail: currentUser.email, item: product }));


    }

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error happened while loading book info</div>

    return (
            <div className='flex justify-center px-4'>
                <div className="max-w-lg shadow-md shadow-slate-600 rounded-lg p-4 ">
                    <h1 className="text-2xl font-bold mb-4 text-center underline">{book.title}</h1>

                    <div>
                        <div className='flex justify-between gap-4 rounded-lg'>
                            <img
                                src={getImgUrl(book.coverImage)}
                                alt="Cover"
                                className="w-1/2 h-auto max-h-[320px] object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                            />
                            <img
                                src={getImgUrl(book.backImage)}
                                alt="Back"
                                className="w-1/2 h-auto max-h-[320px] object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                            />
                        </div>



                        <div className='mb-5'>
                            <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
                            <p className="text-gray-700 mb-3">
                                <strong>Published:</strong> {new Date(book?.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700 mb-3 capitalize">
                                <strong>Category:</strong> {book?.category}
                            </p>
                            <p className="text-gray-700"><strong>Description:</strong> {book.description}</p>
                        </div>

                        {/* Price and Add to Cart in same line */}
                        <div className="flex justify-between items-center mt-3">
                            <p className="text-gray-700">
                                <strong>Price: $</strong> {book?.newPrice}
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
            </div>

    )
}

export default SingleBook;