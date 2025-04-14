import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateOrderMutation } from '../../redux/orders/ordersApi';
import { clearCart } from '../../redux/features/cart/cartSlice';

const CheckOut = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.newPrice * item.quantity), 0).toFixed(2);
    const { currentUser } = useAuth();
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY;

    // Log the key to verify it's loaded (should not be undefined)
    console.log("Razorpay Key:", razorpayKey);

    const { register, handleSubmit } = useForm();
    const [isChecked, setIsChecked] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('COD');

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        if (totalPrice <= 0 || cartItems.length === 0) {
            toast.error("🛒 Your cart is empty.");
            return;
        }

        // Build the order object
        const newOrder = {
            name: data.name,
            email: currentUser?.email,
            address: {
                street: data.street,
                city: data.city,
                country: data.country,
                state: data.state,
                zipcode: data.zipcode
            },
            phone: data.phone,
            productIds: cartItems.map(item => item?._id),
            totalPrice,
            paymentMethod,
        };

        // For Razorpay, trigger the payment flow first
        if (paymentMethod === 'Razorpay') {
            handleRazorpayPayment(newOrder);
            return;
        } else {
            // For COD, create order immediately
            try {
                await createOrder(newOrder).unwrap();
                dispatch(clearCart());
                toast.success("✅ Order placed successfully with Cash on Delivery.");
                navigate('/orders');
            } catch (error) {
                toast.error("Error placing order. Please try again.");
                console.error("⚠️ Order Error:", error);
            }
        }
    };

    const handleRazorpayPayment = (order) => {
        const options = {
            key: razorpayKey,
            amount: parseFloat(order.totalPrice) * 100, // amount in paise
            currency: "INR",
            name: "Novix",
            description: "Test Payment",
            prefill: {
                name: order.name,
                email: order.email,
                contact: order.phone
            },
            theme: {
                color: "#3399cc"
            },
            // This handler executes after a successful payment
            handler: async function (response) {
                if (response.razorpay_payment_id) {
                    // Extend order with payment details
                    const paidOrder = {
                        ...order,
                        paymentId: response.razorpay_payment_id,
                        paymentStatus: "Paid",
                    };
                    try {
                        await createOrder(paidOrder).unwrap();
                        dispatch(clearCart());
                        toast.success("💳 Payment successful and order placed! Payment ID: " + response.razorpay_payment_id);
                        navigate('/orders');
                    } catch (error) {
                        toast.error("Order creation failed after payment.");
                        console.error("⚠️ Order creation error:", error);
                    }
                } else {
                    toast.error("Payment failed: No payment ID received.");
                }
            },
            modal: {
                // This is optional—it fires if user cancels the payment
                ondismiss: function () {
                    toast.error("❌ Payment cancelled.");
                }
            }
        };

        try {
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            toast.error("❌ Razorpay payment failed.");
            console.error("⚠️ Razorpay Error:", error);
        }
    };

    console.log(totalPrice)

    if (isLoading) return <div>Loading....</div>;

    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Checkout</h2>
                    <p className="text-gray-500 mb-2">Total Price: ₹{totalPrice}</p>
                    <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>

                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Personal Details</p>
                            </div>
                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label>Full Name</label>
                                        <input {...register("name", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label>Email Address</label>
                                        <input type="email" defaultValue={currentUser.email} disabled className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label>Phone Number</label>
                                        <input {...register("phone", { required: true })} type="number" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label>Address/Street</label>
                                        <input {...register("street", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-3">
                                        <label>City</label>
                                        <input {...register("city", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label>Country</label>
                                        <input {...register("country", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label>State</label>
                                        <input {...register("state", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label>Zipcode</label>
                                        <input {...register("zipcode", { required: true })} type="text" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                    </div>
                                    <div className="md:col-span-5">
                                        <label>Payment Method</label>
                                        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50">
                                            <option value="COD">Cash on Delivery</option>
                                            <option value="Razorpay">Razorpay</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-5 mt-3">
                                        <div className="inline-flex items-center">
                                            <input type="checkbox" checked={isChecked} onChange={() => setIsChecked(!isChecked)} className="form-checkbox" />
                                            <label className="ml-2">
                                                I agree to the <Link className='underline text-blue-600'>Terms & Conditions</Link>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="md:col-span-5 text-right">
                                        <button disabled={!isChecked} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isChecked && 'opacity-50 cursor-not-allowed'}`}>
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
