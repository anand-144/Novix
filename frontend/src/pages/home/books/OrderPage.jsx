import React from 'react'
import { useGetOrderByEmailQuery } from '../../../redux/orders/ordersApi'
import { useAuth } from '../../../context/AuthContext';

const OrderPage = () => {
    const { currentUser } = useAuth()

    const skipQuery = !currentUser?.email
    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser?.email, {
        skip: skipQuery,
    })

    if (skipQuery) return <div>Loading user...</div>
    if (isLoading) return <div>Loading orders...</div>
    if (isError) return <div>Error loading orders</div>

    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Order</h2>
            {orders.length === 0 ? (
                <div>No Order Found !</div>
            ) : (
                <div>
                    {orders.map((order, index) => (
                        <div key={order._id} className='border-b mb-4 pb-4'>
                            <h1  className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</h1>
                            <h2 className='font-bold'>Order ID: {order._id}</h2>
                            <p className='text-gray-600'>Name: {order.name}</p>
                            <p className='text-gray-600'>Email: {order.email}</p>
                            <p className='text-gray-600'>Phone: {order.phone}</p>
                            <p className='text-gray-600'>TotalPrice: $0{order.totalPrice}</p>
                            <h3 className='font-semibold mt-2'>Address:</h3>
                            <p>{order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                            <h3 className='font-semibold mt-2'>Products Id:</h3>
                            <ul>
                                {order.productIds.map((productId) => (
                                    <li key={productId}>{productId}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrderPage;
