import React from 'react';
import { Hero,  Featured , Recommendation, RecentlyAdded} from '../components';

const Home = () => {
  return (
    <div className="bg-[#F4F5DB] text-gray-900 px-10 py-12">
      <Hero />
      <Featured />
      <RecentlyAdded />
      <Recommendation />
    </div>
  );
};

export default Home;
