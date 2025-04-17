import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUpdateOrderStatusMutation } from '../../redux/orders/ordersApi';  
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import { toast } from 'react-toastify';  // Import Toastify

// Import Toastify styles
import 'react-toastify/dist/ReactToastify.css';

const BookDetails = ({ productId }) => {
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(productId);

  if (isLoading) return <li>Loading book...</li>;
  if (isError || !book) return <li>Error loading book</li>;

  return (
    <li>
      <strong>{book.title}</strong> by {book.author || 'Unknown'}
    </li>
  );
};

const SeeOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusUpdates, setStatusUpdates] = useState({});
  const ordersPerPage = 5;

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/orders/admin`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sorted);
      } catch (err) {
        console.error('Error fetching all orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await updateOrderStatus({ id: orderId, status });
      toast.success('Order status updated successfully!');  // Toast for success
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update status');  // Toast for error
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div className='container mx-auto p-6'>
      <h2 className='text-2xl font-semibold mb-4'>All Orders ({orders.length})</h2>

      {currentOrders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <>
          {currentOrders.map((order, index) => (
            <div key={order._id} className='border-b mb-4 pb-4'>
              <h1 className='p-1 bg-secondary text-white w-10 rounded mb-1'>
                # {(currentPage - 1) * ordersPerPage + index + 1}
              </h1>
              <h2 className='font-bold'>Order ID: {order._id}</h2>
              <p className='text-gray-600'>Name: {order.name}</p>
              <p className='text-gray-600'>Email: {order.email}</p>
              <p className='text-gray-600'>Phone: {order.phone}</p>
              <p className='text-gray-600'>Total Price 💸 : ₹ {order.totalPrice}</p>
              <p className='text-gray-600'>Payment Method : {order.paymentMethod}</p>

              <h3 className='font-semibold mt-2'>Address:</h3>
              <p>{order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.country}, {order.address?.zipcode}</p>

              <h3 className='font-semibold mt-2'>Books:</h3>
              <ul className='list-disc ml-6'>
                {order.productIds.map((productId) => (
                  <BookDetails key={productId} productId={productId} />
                ))}
              </ul>

              <div className="mt-4">
                <h3 className='font-semibold mt-2'>Status:</h3>
                <div className="flex items-center gap-2">
                  <select
                    value={statusUpdates[order._id] || order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                  <button
                    onClick={() => handleUpdateStatus(order._id, statusUpdates[order._id] || order.orderStatus)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index + 1)}
                className={`px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-secondary text-white' : ''}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SeeOrders;
