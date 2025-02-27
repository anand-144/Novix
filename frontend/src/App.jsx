import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "./components";
import { Home, AllBooks, Login, Contact, About, Signup, Cart } from "./pages";
import MyProfile from "./pages/MyProfile";
import { Routes, Route } from "react-router-dom";
import Loader from "./components/Loader/Loader";

const App = () => {
  const [loading, setLoading] = useState(true);


  // Option 2: Simulate a loading delay (e.g., 1 second) for demonstration purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <div className="min-h-screen bg-orange-100 text-gray-900">
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
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
