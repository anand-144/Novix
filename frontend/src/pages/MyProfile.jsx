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
} from "../assets"; // Import local avatars

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [selectedAvatar, setSelectedAvatar] = useState(
    localStorage.getItem("selectedAvatar") || avatar1
  );
  const [showAvatars, setShowAvatars] = useState(false);
  const [confirmAvatar, setConfirmAvatar] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // List of predefined avatars
  const avatars = [
    { id: 1, src: avatar1, gender: "male" },
    { id: 2, src: avatar2, gender: "male" },
    { id: 3, src: avatar3, gender: "male" },
    { id: 4, src: avatar4, gender: "female" },
    { id: 5, src: avatar5, gender: "female" },
    { id: 6, src: avatar6, gender: "female" },
  ];

  // Fetch user details (console the GET data and update state)
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        // console.log("Token:", token);
        const response = await axios.get("http://localhost:3000/api/user/user-details", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched user details:", response.data);
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUserDetails();
  }, []);

  // Define a fallback user if no data is fetched
  const user = userData || {
    username: "Default User",
    email: "default@example.com",
    phone: "0000000000",
    address: "Default Address",
  };

  // Handle Avatar Selection Confirmation (opens confirmation modal)
  const onAvatarClick = (avatar) => {
    setConfirmAvatar(avatar);
  };

  // Confirm avatar selection
  const confirmAvatarSelection = () => {
    setSelectedAvatar(confirmAvatar);
    localStorage.setItem("selectedAvatar", confirmAvatar);
    setConfirmAvatar(null);
    setShowAvatars(false);
    console.log("Avatar updated successfully!");
  };

  // Cancel avatar selection
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
                  {avatars.map((avatar) => (
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
                  Orders
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 p-6">
            {activeTab === "profile" && (
              <div>
                <h2 className="text-3xl font-bold text-[#5D0E41] mb-4">My Profile</h2>
                {loadingUser ? (
                  <p>Loading...</p>
                ) : (
                  <div className="space-y-4 text-gray-700">
                    <div className="flex justify-between">
                      <span className="font-semibold">Name:</span>
                      <span>{user.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Email:</span>
                      <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Phone:</span>
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Address:</span>
                      <span>{user.address}</span>
                    </div>
                  </div>
                )}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-[#5D0E41] text-white py-2 rounded hover:bg-[#9B1B30] transition">
                    Edit Profile
                  </button>
                  <button className="flex-1 border border-[#5D0E41] text-[#5D0E41] py-2 rounded hover:bg-[#5D0E41] hover:text-white transition">
                    Change Password
                  </button>
                </div>
              </div>
            )}
            {activeTab === "wishlist" && (
              <div>
                <h2 className="text-3xl font-bold text-[#5D0E41] mb-4">Wishlist</h2>
                <p className="text-gray-500">No items in wishlist.</p>
              </div>
            )}
            {activeTab === "orders" && (
              <div className="max-h-96 overflow-y-auto">
                <h2 className="text-3xl font-bold text-[#5D0E41] mb-4">Orders</h2>
                <div>
                  <h3 className="text-xl font-semibold text-[#5D0E41] mb-2">
                    Ongoing Orders
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { id: 101, product: "Rich Dad Poor Dad", status: "Shipped" },
                      { id: 102, product: "The Lean Startup", status: "Processing" },
                      { id: 103, product: "Sapiens", status: "Delivered" },
                      { id: 104, product: "The Psychology of Money", status: "Processing" },
                      { id: 105, product: "Think and Grow Rich", status: "Shipped" },
                    ].map((order) => (
                      <li key={order.id} className="border p-3 rounded">
                        <div className="flex justify-between">
                          <span className="font-semibold">{order.product}</span>
                          <span>{order.status}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-[#5D0E41] mb-2">
                    Order History
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { id: 201, product: "Zero to One", date: "Jan 10, 2024" },
                      { id: 202, product: "Deep Work", date: "Feb 5, 2024" },
                      {
                        id: 203,
                        product: "The Subtle Art of Not Giving a F*ck",
                        date: "Feb 15, 2024",
                      },
                      {
                        id: 204,
                        product: "48 Laws of Power",
                        date: "Mar 1, 2024",
                      },
                    ].map((order) => (
                      <li key={order.id} className="border p-3 rounded">
                        <div className="flex justify-between">
                          <span className="font-semibold">{order.product}</span>
                          <span>{order.date}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
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
