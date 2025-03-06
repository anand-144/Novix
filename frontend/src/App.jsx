import React, { useState, useEffect, useMemo } from "react";
import { Navbar, Footer, ForgotPassword, ResetPassword } from "./components";
import { Home, AllBooks, Login, Contact, About, Signup, Cart } from "./pages";
import MyProfile from "./pages/MyProfile";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import BookDetails from "./components/ViewBook/BookDetails";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Use memoized loading delay for efficiency
  useMemo(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-[#F4F5DB]">
      <Loader />
    </div>
  ) : (
    <div className="min-h-screen bg-[#F4F5DB] text-gray-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
