import React from 'react';
import Hero from '../components/Hero';
import Geners from '../components/Geners';
import Featured from '../components/Featured';

const Home = () => {
  return (
    <div className="bg-white text-gray-900 px-10 py-12">
      <Hero />
      <Geners />
      <Featured />
    </div>
  );
};

export default Home;
