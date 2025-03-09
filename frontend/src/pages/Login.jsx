import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { authActions } from "../store/auth";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make the login request
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;

      if (response.status === 200) {
        // Store token and role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // Attempt to retrieve the email from the login response
        let userEmail = data.email;
        // If email is not returned in the login response, fetch it from user-details
        if (!userEmail) {
          userEmail = await fetchUserDetails(data.token);
        }
        if (userEmail) {
          localStorage.setItem("email", userEmail);
        } else {
          toast.error("Could not retrieve user email.");
          setLoading(false);
          return;
        }

        // Also store in sessionStorage if "Remember Me" is not checked
        if (!rememberMe) {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("role", data.role);
          sessionStorage.setItem("email", userEmail);
        }

        // Update Redux state
        dispatch(authActions.login());
        dispatch(authActions.changeRole(data.role));

        toast.success("Login successful!");

        // Redirect to contact form (or admin dashboard if applicable)
        setTimeout(() => {
          navigate(data.role === "admin" ? "/admin-dashboard" : "/contact");
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F5DB] px-4">
      <ToastContainer />
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#5D0E41]">
          Login
        </h2>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Username</label>
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
          <div className="relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="rememberMe" className="text-gray-700">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#5D0E41] text-white py-2 rounded-md hover:bg-[#9B1B30] transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 flex justify-center">
          <span>Don't have an account?</span>
          <Link
            to="/signup"
            className="ml-2 text-[#5D0E41] font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
