import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaHeart, FaBox, FaUserEdit, FaLock } from "react-icons/fa";
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
} from "../assets"; 
import Wishlist from "../components/profile/Whislist";
import OrderHistory from "../components/profile/OrderHistory";

const MyProfile = () => {
  // "profile" tab will show user profile details
  // "wishlist" remains unchanged
  // "orders" tab will now display order history
  const [activeTab, setActiveTab] = useState("profile"); 
  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("selectedAvatar") || avatar1
  );
  const [showAvatars, setShowAvatars] = useState(false);
  const [confirmAvatar, setConfirmAvatar] = useState(null);

  // State for user profile details (previous profile)
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // State for order history
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token =
          localStorage.getItem("token") || sessionStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/user-details`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch order history data
  useEffect(() => {
    const fetchOrderHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingOrders(false);
        return;
      }
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/orders/history`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Assuming your backend returns an array of orders in response.data.orders
        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrderHistory();
  }, []);

  // Handlers for avatar selection
  const onAvatarClick = (avatar) => {
    setConfirmAvatar(avatar);
  };

  const confirmAvatarSelection = () => {
    setSelectedAvatar(confirmAvatar);
    localStorage.setItem("selectedAvatar", confirmAvatar);
    setConfirmAvatar(null);
    setShowAvatars(false);
    console.log("Avatar updated successfully!");
  };

  const cancelAvatarSelection = () => {
    setConfirmAvatar(null);
  };

  return (
    <div className="min-h-screen bg-[#F4F5DB] mt-9 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-9 border-t-2">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 bg-[#F4F5DB] p-6 border-b md:border-b-0 md:border-r border-[#5D0E41]">
            <div className="flex flex-col items-center">
              <img
                src={selectedAvatar}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-[#5D0E41] shadow-lg cursor-pointer"
                onClick={() => setShowAvatars(!showAvatars)}
              />
              <p
                className="mt-2 text-sm text-[#5D0E41] cursor-pointer"
                onClick={() => setShowAvatars(!showAvatars)}
              >
                Change Avatar
              </p>
            </div>
            {showAvatars && (
              <div className="mt-4">
                <h3 className="text-center text-lg font-medium text-[#5D0E41] mb-2">
                  Choose an Avatar
                </h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { id: 1, src: avatar1 },
                    { id: 2, src: avatar2 },
                    { id: 3, src: avatar3 },
                    { id: 4, src: avatar4 },
                    { id: 5, src: avatar5 },
                    { id: 6, src: avatar6 },
                  ].map((avatar) => (
                    <img
                      key={avatar.id}
                      src={avatar.src}
                      alt={`Avatar ${avatar.id}`}
                      className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                        selectedAvatar === avatar.src
                          ? "border-[#5D0E41]"
                          : "border-transparent"
                      }`}
                      onClick={() => onAvatarClick(avatar.src)}
                    />
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8">
              <ul className="space-y-4">
                <li
                  className={`cursor-pointer py-2 px-4 rounded ${
                    activeTab === "profile"
                      ? "bg-[#5D0E41] text-white"
                      : "text-[#5D0E41]"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile
                </li>
                <li
                  className={`cursor-pointer py-2 px-4 rounded ${
                    activeTab === "wishlist"
                      ? "bg-[#5D0E41] text-white"
                      : "text-[#5D0E41]"
                  }`}
                  onClick={() => setActiveTab("wishlist")}
                >
                  Wishlist
                </li>
                <li
                  className={`cursor-pointer py-2 px-4 rounded ${
                    activeTab === "orders"
                      ? "bg-[#5D0E41] text-white"
                      : "text-[#5D0E41]"
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  Order History
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-3xl font-bold text-[#5D0E41] mb-4">
                  My Profile
                </h2>
                {loadingUser ? (
                  <div>Loading profile...</div>
                ) : userData ? (
                  <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Name:</span>
                      <span>{userData.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Email:</span>
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Phone:</span>
                      <span>{userData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Address:</span>
                      <span>{userData.address}</span>
                    </div>
                  </div>
                ) : (
                  <div>No profile data found.</div>
                )}
              </div>
            )}

            {activeTab === "wishlist" && (
              <div>
                <Wishlist />
              </div>
            )}

            {activeTab === "orders" && (
              <div className="max-h-96 overflow-y-auto">
                <h2 className="text-3xl font-bold text-[#5D0E41] mb-4">
                  Order History
                </h2>
                {loadingOrders ? (
                  <div>Loading order history...</div>
                ) : orders.length === 0 ? (
                  <div>No order history found.</div>
                ) : (
                  <ul className="space-y-3">
                    {orders.map((order) => (
                      <li key={order.id} className="border p-3 rounded">
                        <div className="flex justify-between">
                          <span className="font-semibold">
                            {order.product}
                          </span>
                          <span>{order.date}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Avatar Selection */}
      {confirmAvatar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold text-[#5D0E41] mb-4 text-center">
              Confirm Avatar Selection
            </h2>
            <div className="flex justify-center mb-4">
              <img
                src={confirmAvatar}
                alt="Confirm Avatar"
                className="w-24 h-24 rounded-full border-4 border-[#5D0E41]"
              />
            </div>
            <p className="text-gray-700 mb-6 text-center">
              Are you sure you want to select this avatar?
            </p>
            <div className="flex justify-around">
              <button
                className="bg-[#5D0E41] text-white px-4 py-2 rounded hover:bg-[#9B1B30] transition"
                onClick={confirmAvatarSelection}
              >
                Yes
              </button>
              <button
                className="border border-[#5D0E41] text-[#5D0E41] px-4 py-2 rounded hover:bg-[#5D0E41] hover:text-white transition"
                onClick={cancelAvatarSelection}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
