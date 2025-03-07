import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = useSelector((state) => state.auth.username);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please log in to view your wishlist.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/wishlist/get-wishlist`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Fetched wishlist data:", response.data);
        setWishlistItems(response.data.data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        toast.error("Error fetching wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (bookId, e) => {
    e.stopPropagation(); // prevent navigation when removing
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to remove items from your wishlist.");
      return;
    }
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/wishlist/remove-wishlist`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            bookid: bookId,
          },
        }
      );
      console.log("Remove response:", response.data);
      toast.success("Book removed from wishlist!");
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item._id !== bookId)
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error(
        error.response?.data?.message || "Error removing from wishlist."
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-700">Loading wishlist...</div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold text-gray-700">
          No items in wishlist.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center text-[#5D0E41] mb-8">
        {username ? `Wishlist for ${username}` : "Wishlist"}
      </h2>
      {/* Vertical scroll container with fixed height and hidden scrollbar */}
      <div className="h-96 overflow-y-auto hide-scrollbar space-y-6">
        {wishlistItems.map((item) => (
          <motion.div
            key={item._id}
            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between cursor-pointer transition hover:shadow-xl"
            onClick={() => navigate(`/book/${item._id}`)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">By {item.author}</p>
            </div>
            <div className="ml-4 flex items-center">
              <img
                src={Array.isArray(item.images) ? item.images[0] : item.images}
                alt="Book Cover"
                className="w-24 h-32 object-cover rounded-lg"
              />
              <button
                onClick={(e) => handleRemove(item._id, e)}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition"
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
