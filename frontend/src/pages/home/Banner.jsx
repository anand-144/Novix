import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BannerImage1 from '../../../public/assets/Banner.png';
import BannerImage2 from '../../../public/assets/Banner2.png';
import BannerImage3 from '../../../public/assets/Banner3.png';



import Footer from '../../components/Footer';

const banners = [
  {
    image: BannerImage1, // Using the public directory for images
    title: 'New Release This Week',
    text: 'Discover the latest page-turners and timeless classics at our bookstore. From gripping thrillers to heartwarming tales, find your next favorite read. Explore new releases every week and dive into captivating stories. Start your literary adventure today!',
  },
  {
    image: BannerImage2, // Using the public directory for images
    title: 'Explore Bestseller Picks',
    text: 'Find out what’s trending in the book world. Our bestseller collection is filled with exciting, thought-provoking, and inspiring reads loved by readers worldwide.',
  },
  {
    image: BannerImage3, // Using the public directory for images
    title: 'Dive into New Genres',
    text: 'Step out of your comfort zone and try a new genre. Whether it\'s sci-fi, historical fiction, or memoirs – we have something for every kind of reader.',
  },
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle changing the carousel image automatically every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const { image, title, text } = banners[currentIndex];

  // Function to scroll to the footer
  const scrollToFooter = () => {
    const footer = document.getElementById('footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='relative py-8 px-6 md:px-12'>
      <div className='flex flex-col md:flex-row-reverse justify-between items-center gap-12'>
        {/* Image directly placed without extra container */}
        <div className='md:w-auto w-full flex items-start md:justify-start'>
          <img src={image} alt="Banner" className="w-full h-auto" />
        </div>
        <div className='md:w-1/2 w-full'>
          <h1 className='md:text-5xl text-2xl font-medium mb-7'>{title}</h1>
          <p className='mb-10'>{text}</p>
          <button onClick={scrollToFooter} className='btn-primary'>Subscribe</button>
        </div>
      </div>

      {/* Arrows */}
      <div className='absolute left-4 top-1/2 transform -translate-y-1/2'>
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1))}
          className='bg-gray-200 p-2 rounded-full hover:bg-gray-300'
        >
          ‹
        </button>
      </div>
      <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
        <button
          onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length)}
          className='bg-gray-200 p-2 rounded-full hover:bg-gray-300'
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className='flex justify-center mt-6 space-x-2'>
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${idx === currentIndex ? 'bg-indigo-600' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
