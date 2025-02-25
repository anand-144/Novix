import React from 'react';
import { Hero, Genres, Featured , RecentallyAdded} from '../components';

const Home = () => {
  return (
    <div className="bg-white text-gray-900 px-10 py-12">
      <Hero />
      <Genres />
      <Featured />
      <RecentallyAdded />
    </div>
  );
};

export default Home;
