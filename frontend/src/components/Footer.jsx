import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F4F5DB] text-[#5D0E41] py-12 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#5D0E41]">NovixBook</h1>
            <p className="mt-3 text-gray-700 max-w-sm">
              Your gateway to a world of stories, knowledge, and inspiration. Discover your next great read.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              {["Home", "About Us", "All Books", "Contact Us"].map((link, index) => (
                <li key={index}>
                  <a href={`/${link.toLowerCase().replace(/\s+/g, '')}`} className="text-gray-700 hover:text-[#5D0E41] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-3">Follow Us</h2>
            <div className="flex justify-center md:justify-start space-x-6">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-gray-700 hover:text-[#5D0E41] transition transform hover:scale-110"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-400 pt-4 text-center text-gray-700 text-sm">
          &copy; 2025 <span className="font-semibold">NovixBook</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
