// src/components/Footer.jsx
import React, { useState } from 'react';
import footerLogo from "../assets/footer-logo.png"; // Adjust the path as needed
import { db } from '../firebase/firebase.config';
import { addDoc, collection, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;

    try {
      // Check if the email already exists in Firestore
      const q = query(collection(db, "emails"), where("email", "==", input));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setMessage("This email is already subscribed.");
        return;
      }

      // Add the email if it doesn't already exist
      await addDoc(collection(db, "emails"), {
        email: input,
        time: serverTimestamp(),
      });
      console.log("Email submitted:", input);
      setInput('');
      setMessage("Thank you for subscribing!");
    } catch (error) {
      console.error("Error submitting email:", error);
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <footer className="bg-[#006A67] text-white px-6 md:px-12 py-10">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Company Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li><a href="#home" className="hover:text-primary">Home</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#about" className="hover:text-primary">About Us</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <form onSubmit={submitHandler} className="flex">
            <input
              value={input}
              onChange={inputHandler}
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md text-black"
              required
            />
            <button type="submit" className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
              Subscribe
            </button>
          </form>
          {message && <p className="mt-2">{message}</p>}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
