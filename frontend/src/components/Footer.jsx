import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-white text-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-orange-600">NovixBook</h1>
            <p className="mt-3 text-gray-600 max-w-sm">
              Your one-stop destination for all your reading needs. Discover a world of knowledge and inspiration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/allbooks" className="text-gray-600 hover:text-orange-500 transition-colors">
                  All Books
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-orange-500 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-500 transition transform hover:scale-110">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition transform hover:scale-110">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-fuchsia-500 transition transform hover:scale-110">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-500 transition transform hover:scale-110">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-300 pt-4 text-center text-gray-500 text-sm">
          &copy; 2025 NovixBook. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
