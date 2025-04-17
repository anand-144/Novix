// src/components/RevenueChart.jsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders/admin`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Group totalPrice by month
        const monthly = Array(12).fill(0);
        res.data.forEach((order) => {
          const date = new Date(order.createdAt);
          const month = date.getMonth(); // 0 = Jan, 11 = Dec
          monthly[month] += order.totalPrice;
        });

        setMonthlyRevenue(monthly);
      } catch (err) {
        console.error("Error fetching revenue data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue (INR ₹)',
        data: monthlyRevenue,
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Revenue (₹)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) return <div className="text-center p-4">Loading Revenue Chart...</div>;

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
      <div className="hidden md:block">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default RevenueChart;
