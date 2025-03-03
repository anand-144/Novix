import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecentlyAdded from "../RecentlyAdded";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // Fetch Book Details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/book/book/${id}`
        );
        setBook(data.book);
        if (data.book?.images?.length) {
          setSelectedImage(data.book.images[0]);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  // Fetch Book Reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`
        );
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  // Calculate Average Rating
  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  // Handle Review Submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to leave a review.");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reviews/${id}`,
        { rating: reviewRating, comment: reviewComment },
        config
      );
      setReviews((prev) => [data, ...prev]);
      setReviewRating(0);
      setReviewComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review.");
    }
  };

  // Handle Buy Now Action
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first to buy this book.");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/purchase/${book._id}`,
        { quantity: 1 },
        config
      );
      toast.success("Purchase successful!");
    } catch (error) {
      console.error("Error purchasing book:", error);
      toast.error("Error purchasing book.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center text-gray-600 mt-8">
        <p>Book not found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden bg-[#F4F5DB] min-h-screen">
      <div className="container mx-auto p-6 pt-24">
        <ToastContainer />
  
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Book Image */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="border border-[#5D0E41] border-l-4 border-b-4 backdrop-blur-lg p-2 rounded-md">
              <img src={selectedImage} alt={book.title} className="w-full object-contain rounded-md max-h-[350px]" />
            </div>
            <div className="flex gap-2 justify-center">
              {book.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(image)}
                  className={`cursor-pointer w-16 h-16 object-cover rounded-md transition-all ${
                    selectedImage === image ? "border-2 border-[#5D0E41] shadow-md" : ""
                  }`}
                />
              ))}
            </div>
          </div>
  
          {/* Right: Book Details */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold text-[#5D0E41]">{book.title}</h1>
            <p className="text-lg md:text-xl text-gray-700 mt-2">
              By <span className="font-semibold">{book.author}</span>
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-lg text-gray-700">Publisher: {book.publisher}</p>
              <p className="text-lg text-gray-700">
                Price: <span className="font-bold">${book.price}</span>
              </p>
              <p className="text-lg text-gray-700">Stock: {book.stock}</p>
            </div>
            <p className="mt-6 text-gray-600 leading-relaxed text-lg">{book.description}</p>
            <button
              onClick={handleBuyNow}
              className="mt-6 px-6 py-3 bg-[#5D0E41] text-white rounded-md hover:bg-[#9B1B30] transition-all cursor-pointer"
            >
              Buy Me
            </button>
          </div>
        </div>
  
        {/* Reviews Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-semibold text-[#5D0E41] text-center">Reviews</h2>
  
          {/* Display Overall Rating */}
          {reviews.length > 0 && (
            <div className="flex justify-center items-center mt-4">
              <span className="text-lg font-semibold text-gray-700">Overall Rating:</span>
              <span className="ml-2 text-xl font-bold text-[#5D0E41]">{averageRating.toFixed(1)} / 5</span>
            </div>
          )}
  
          {/* Display Reviews */}
          <div className="max-w-lg mx-auto mt-6">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-700">No reviews yet.</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-300 pb-4 mb-4">
                  <p className="font-semibold text-[#5D0E41]">{review.user?.username || "Anonymous"}</p>
                  <p className="text-gray-700 mt-1">{review.comment}</p>
                </div>
              ))
            )}
          </div>
  
          <RecentlyAdded />
        </div>
      </div>
    </div>
  );
}  

export default BookDetails;
