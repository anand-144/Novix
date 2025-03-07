import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RecentlyAdded from "../RecentlyAdded";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";
import ReviewList from "../ReviewList";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // Get authentication state from Redux store
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const username = useSelector((state) => state.auth.username);

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
      toast.error("Please log in to submit a review.");
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

      // Add new review to UI
      setReviews((prev) => [
        { ...data, user: { username }, createdAt: new Date().toISOString() },
        ...prev,
      ]);
      setReviewRating(0);
      setReviewComment("");
      toast.success("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error submitting review.");
    }
  };

  // Handle Buy Now Action
  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to buy this book.");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      await axios.put(
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
            <div className="border border-[#5D0E41] border-l-4 border-b-4 p-2 rounded-md relative">
              <img src={selectedImage} alt={book.title} className="w-full object-contain rounded-md max-h-[350px]" />

              {/* Wishlist Icon for User */}
              {isLoggedIn && role === "user" && (
                <button className="absolute top-2 right-2 text-red-500 text-2xl">
                  <FaHeart />
                </button>
              )}

              {/* Admin Icons */}
              {isLoggedIn && role === "admin" && (
                <div className="absolute top-2 right-2 flex gap-2">
                  <button className="text-blue-500 text-2xl">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 text-2xl">
                    <FaTrash />
                  </button>
                </div>
              )}
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
              <p className="text-lg text-gray-700">Price: <span className="font-bold">${book.price}</span></p>
              <p className="text-lg text-gray-700">Stock: {book.stock}</p>
              <p className="text-lg text-gray-700">Average Rating: {averageRating.toFixed(1)} / 5</p>
            </div>

            <button onClick={handleBuyNow} className="mt-6 px-6 py-3 bg-[#5D0E41] text-white rounded-md">
              Buy Me
            </button>
          </div>
        </div>

        {/* Review Writing Section */}
        {isLoggedIn && (
          <form onSubmit={handleReviewSubmit} className="max-w-lg mx-auto mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-[#5D0E41]">Write a Review</h3>
            <textarea className="w-full mt-2 p-2 border rounded-md" placeholder="Write your review..."
              value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} required
            />
            <button type="submit" className="mt-4 px-4 py-2 bg-[#5D0E41] text-white rounded-md">Submit Review</button>
          </form>
        )}

        {/* Display Submitted Reviews */}
        <ReviewList reviews={reviews} />
        <RecentlyAdded />
      </div>
    </div>
  );
};

export default BookDetails;
