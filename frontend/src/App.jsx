import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="min-h-screen bg-white text-gray-900">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </div>
  );
};

export default App;