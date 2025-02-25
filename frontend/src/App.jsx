import React from "react";
import { Navbar, Footer } from "./components";
import { Home , AllBooks, Login, Contact, About, Signup, Cart} from "./pages";
import { Routes, Route } from "react-router-dom";
import MyProfile from "./pages/MyProfile";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="min-h-screen bg-white text-gray-900">
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
