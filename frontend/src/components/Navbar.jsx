import React, { useState, useRef, useEffect } from "react";
import { SiBookstack } from "react-icons/si";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { GiBookPile } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth"; 
import { avatar1 } from "../assets"; // Default avatar

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(
    localStorage.getItem("selectedAvatar") || avatar1
  ); // ✅ Load avatar from localStorage
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // ✅ Handle Logout and Redirect to Login
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    localStorage.removeItem("selectedAvatar"); // ✅ Remove avatar on logout

    setProfileAvatar(avatar1); // ✅ Reset to default avatar
    dispatch(authActions.logout());
    setShowDropdown(false);
    navigate("/login");
  };

  // ✅ Restore auth state and avatar on page load
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");
    const savedAvatar = localStorage.getItem("selectedAvatar");

    if (token) {
      dispatch(authActions.login());
      if (role) {
        dispatch(authActions.changeRole(role));
      }
    }

    if (savedAvatar) {
      setProfileAvatar(savedAvatar); // ✅ Set avatar from storage
    }
  }, [dispatch]);

  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/allbooks" },
    { title: "About Us", link: "/about" },
    { title: "Contact", link: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#F4F5DB]/80 shadow-lg border-b border-gray-200 transition-all">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center gap-2">
              <SiBookstack className="text-3xl md:text-4xl text-[#5D0E41]" />
              <h1 className="text-2xl md:text-3xl font-bold text-[#5D0E41]">Novix</h1>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
            {links.map(({ title, link }, i) => (
              <li key={i}>
                <Link to={link} className="hover:text-[#9B1B30] transition-colors text-lg">
                  {title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Button */}
            <button className="md:hidden text-2xl text-[#5D0E41]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link to="/cart" className="hover:text-[#9B1B30] transition-colors text-2xl">
              <GiBookPile />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="hover:text-[#9B1B30] transition-colors text-2xl"
              >
                {isLoggedIn ? (
                  <img
                    src={profileAvatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-[#5D0E41] shadow-md"
                  />
                ) : (
                  <FaUser className="text-2xl text-[#5D0E41]" />
                )}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white text-[#5D0E41] border border-gray-300">
                  {isLoggedIn ? (
                    <>
                      <Link
                        onClick={() => setShowDropdown(false)}
                        to="/profile"
                        className="block px-4 py-2 hover:bg-[#9B1B30] hover:text-white transition"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white transition"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        onClick={() => setShowDropdown(false)}
                        to="/login"
                        className="block px-4 py-2 hover:bg-[#9B1B30] hover:text-white transition"
                      >
                        Login
                      </Link>
                      <Link
                        onClick={() => setShowDropdown(false)}
                        to="/signup"
                        className="block px-4 py-2 hover:bg-[#9B1B30] hover:text-white transition"
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Side Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-2/3 sm:w-1/2 z-50 transition-transform duration-300 bg-[#F4F5DB] text-[#5D0E41] shadow-lg ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileMenuOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-6">
          {links.map(({ title, link }, i) => (
            <li key={i}>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                to={link}
                className="block hover:text-[#9B1B30] transition-colors text-lg"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
