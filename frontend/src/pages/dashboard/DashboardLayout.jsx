import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from 'react-icons/hi';
import { MdOutlineManageHistory, MdShoppingCart } from 'react-icons/md';
import logo from '../../assets/logo.png';

const DashboardLayout = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  if (loading) return <Loading />;

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Sidebar (Desktop only) */}
      <aside className="hidden md:flex flex-col w-20 h-screen sticky top-0 bg-gray-800 shadow-lg items-center py-6 gap-6">
        <img src={logo} alt="logo" className="w-10 h-10" />

        <Link to="/dashboard" title="Dashboard">
          <svg className="h-6 w-6 text-white hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </Link>

        <Link to="/dashboard/add-new-book" title="Add Book">
          <HiViewGridAdd className="h-6 w-6 text-white hover:text-purple-400" />
        </Link>

        <Link to="/dashboard/manage-books" title="Manage Books">
          <MdOutlineManageHistory className="h-6 w-6 text-white hover:text-purple-400" />
        </Link>

        {/* Manage Orders Icon */}
        <Link to="/dashboard/see-orders" title="See Orders">
  <MdShoppingCart className="h-6 w-6 text-white hover:text-purple-400" />
</Link>

        <button onClick={handleLogout} title="Logout">
          <svg className="h-6 w-6 text-white hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </aside>

      {/* Topbar (Mobile only) */}
      <header className="flex md:hidden sticky top-0 z-20 bg-gray-800 p-3 justify-between items-center flex-wrap gap-4">
        <img src={logo} alt="logo" className="w-10 h-10" />
        <div className="flex items-center gap-4 flex-wrap">
          <Link to="/dashboard" title="Dashboard">
            <svg className="h-6 w-6 text-white hover:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </Link>
          <Link to="/dashboard/add-new-book" title="Add Book">
            <HiViewGridAdd className="h-6 w-6 text-white hover:text-purple-400" />
          </Link>
          <Link to="/dashboard/manage-books" title="Manage Books">
            <MdOutlineManageHistory className="h-6 w-6 text-white hover:text-purple-400" />
          </Link>
          <Link to="/dashboard/see-orders" title="See Orders">
            <MdShoppingCart className="h-6 w-6 text-white hover:text-purple-400" />
          </Link>
          <button onClick={handleLogout} title="Logout">
            <svg className="h-6 w-6 text-white hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </section>
  );
};

export default DashboardLayout;
