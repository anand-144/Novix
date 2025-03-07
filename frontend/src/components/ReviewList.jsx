import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ReviewList = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const showPrevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  return (
    <div className="max-w-lg mx-auto mt-6 bg-white p-6 rounded-lg shadow-md relative">
      <h2 className="text-3xl font-semibold text-[#5D0E41] text-center mb-4">User Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-700">No reviews yet.</p>
      ) : (
        <div className="relative flex items-center justify-center">
          {/* Left Button (Always Visible) */}
          <button
            onClick={showPrevReview}
            className="absolute left-0 bg-[#5D0E41] text-white w-12 h-12 rounded-full shadow-md flex items-center justify-center hover:bg-[#9B1B30] transition-all z-10"
          >
            ❮
          </button>

          {/* Review Display */}
          <div className="relative w-full flex justify-center items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviews[currentIndex]._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full border border-gray-300 rounded-lg p-4 bg-white shadow-md text-center"
              >
                {/* Reviewer's Name & Date */}
                <p className="font-semibold text-[#5D0E41] text-lg">{reviews[currentIndex].user?.username || "Anonymous"}</p>
                <p className="text-gray-600 text-sm">{new Date(reviews[currentIndex].createdAt).toLocaleDateString()}</p>

                {/* Star Rating */}
                <div className="flex justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <span key={starIndex} className={starIndex < reviews[currentIndex].rating ? "text-yellow-500 text-xl" : "text-gray-300 text-xl"}>
                      ★
                    </span>
                  ))}
                </div>

                {/* Review Comment */}
                <p className="text-gray-700 mt-2">{reviews[currentIndex].comment}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Button (Always Visible) */}
          <button
            onClick={showNextReview}
            className="absolute right-0 bg-[#5D0E41] text-white w-12 h-12 rounded-full shadow-md flex items-center justify-center hover:bg-[#9B1B30] transition-all z-10"
          >
            ❯
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
