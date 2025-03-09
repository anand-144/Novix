import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",  
    email: "",
    phone: "",      
    address: "",    
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to fetch user details using the token
  const fetchUserDetails = async (token) => {
    try {
      const detailsRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/user/user-details`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (
        detailsRes.data &&
        detailsRes.data.user &&
        detailsRes.data.user.email
      ) {
        return detailsRes.data.user.email;
      }
    } catch (err) {
      console.error("Error fetching user details", err);
    }
    return null;
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle signup submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData); // Debugging: Check form data
  
    if (
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.password
    ) {
      toast.error("Please fill in all fields");
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("Signup Success:", response.data); // Debugging

      // Extract data from the response
      const data = response.data;
      const { token, role } = data;
      if (!token || !role) {
        throw new Error("Signup response is missing token or role");
      }

      // Get email: if not returned in the response, fetch it via token
      let userEmail = data.email;
      if (!userEmail) {
        userEmail = await fetchUserDetails(token);
      }
      if (userEmail) {
        localStorage.setItem("email", userEmail);
        sessionStorage.setItem("email", userEmail);
      } else {
        toast.error("Could not retrieve user email.");
        setLoading(false);
        return;
      }
  
      // Store token & role before navigating
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
  
      // Update Redux auth state so the navbar updates immediately
      dispatch(authActions.login());
      dispatch(authActions.changeRole(role));
  
      toast.success("Signup successful! Redirecting...");
  
      setTimeout(() => {
        console.log("Navigating to:", role === "admin" ? "/admin-dashboard" : "/");
        navigate(role === "admin" ? "/admin-dashboard" : "/");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message); // Debugging
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5DB] px-4 py-4 mt-9">
      <ToastContainer />
      <div className="border border-[#5D0E41] border-l-4 border-b-4 p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#5D0E41]">
          Sign Up
        </h2>
  
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
  
          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
  
          {/* Phone */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
  
          {/* Address */}
          <div>
            <label className="block text-gray-700 text-sm sm:text-base">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
  
          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 text-sm sm:text-base">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full p-2 border rounded-md pr-10"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
  
          <button
            type="submit"
            className="w-full bg-[#5D0E41] text-white py-2 rounded-md hover:bg-[#9B1B30] transition"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
  
        {/* Redirect to Login */}
        <p className="mt-4 text-center text-gray-700 text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-[#5D0E41] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
