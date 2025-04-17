import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import RevenueChart from './RevenueChart';
import { MdIncompleteCircle } from 'react-icons/md';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-4 space-y-8">
      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Products */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow">
          <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-purple-100 text-purple-600 rounded-full mr-4">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <span className="block text-xl font-bold">{data?.totalBooks || 0}</span>
            <span className="text-gray-500">Products</span>
          </div>
        </div>

        {/* Card 2: Total Sales */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow">
          <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-green-100 text-green-600 rounded-full mr-4">
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div>
            <span className="block text-xl font-bold">₹{data?.totalSales || 0}</span>
            <span className="text-gray-500">Total Sales</span>
          </div>
        </div>

        {/* Card 3: Trending Books */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow">
          <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-yellow-100 text-yellow-500 rounded-full mr-4">
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="h-6 w-6"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.946c.3.922-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.196-1.54-1.118l1.287-3.946a1 1 0 00-.364-1.118L2.075 9.373c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.946z" />
            </svg>
          </div>
          <div>
            <span className="block text-xl font-bold">{data?.trendingBooks || 0}</span>
            <span className="block text-gray-500">Trending Books</span>
          </div>
        </div>


        {/* Card 4: Total Orders */}
        <div className="flex items-center p-6 bg-white rounded-lg shadow">
          <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full mr-4">
            <MdIncompleteCircle className="text-2xl" />
          </div>
          <div>
            <span className="block text-xl font-bold">{data?.totalOrders || 0}</span>
            <span className="text-gray-500">Total Orders</span>
          </div>
        </div>
      </section>

      {/* Chart Section */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Orders Per Month</h2>
        <div className="w-full">
          <RevenueChart />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
