import React, { useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { FaMapMarkerAlt } from 'react-icons/fa';

const Checkout = () => {
    const { getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        paymentMethod: 'cod'
    });

    const totalAmount = getCartTotal();
    const deliveryCharge = totalAmount > 0 ? 40 : 0;
    const grandTotal = totalAmount + deliveryCharge;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const detectLocation = () => {
        if (navigator.geolocation) {
            toast.info('Detecting location...', { autoClose: 2000 });
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();
                        console.log("Nominatim Data:", data);
                        if (data && data.display_name) {
                            console.log("Setting Address:", data.display_name);
                            // Ensure state update happens
                            setFormData(prev => {
                                const newData = { ...prev, address: data.display_name };
                                console.log("New Form Data:", newData);
                                return newData;
                            });
                            toast.success('Location detected successfully!');
                        } else {
                            toast.error('Could not detect address details.');
                        }
                    } catch (error) {
                        console.error("Fetch Error:", error);
                        toast.error('Error fetching address from coordinates.');
                    }
                },
                (error) => {
                    console.error("Geolocation Error:", error);
                    let errorMessage = "Location access denied or unavailable.";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Location permission denied. Please allow location access in your browser settings.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Location information is unavailable.";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "The request to get user location timed out.";
                            break;
                        case error.UNKNOWN_ERROR:
                            errorMessage = "An unknown error occurred.";
                            break;
                    }
                    toast.error(errorMessage);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            toast.error('Geolocation is not supported by this browser.');
        }
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.paymentMethod === 'cod') {
            // Simulate Order Creation
            const newOrder = {
                id: 'ORD' + Math.floor(Math.random() * 1000000),
                date: new Date().toISOString(),
                status: 'Preparing',
                total: grandTotal,
                items: JSON.parse(localStorage.getItem('cartItems')) || [],
                ...formData
            };

            // Save to local storage (mock backend)
            const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
            localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

            toast.success('Order Placed Successfully!');
            clearCart();
            navigate(`/order/${newOrder.id}`);
            return;
        }

        // Online Payment via Razorpay
        const res = await loadRazorpay();

        if (!res) {
            toast.error('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            const storedUser = localStorage.getItem('food_delivery_user');
            const token = storedUser ? JSON.parse(storedUser).token : null;
            const config = {
                headers: {
                    Authorization: token ? `Bearer ${token}` : ''
                }
            };

            const result = await axios.post('https://food-delivery-backend-1-rn4y.onrender.com/api/payment/create-order', {
                amount: grandTotal
            }, config);

            if (!result) {
                toast.error('Server error. Are you online?');
                return;
            }

            const { amount, id: order_id, currency } = result.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "YOUR_TEST_KEY_ID_HERE", // Replace with your razorpay key in .env
                amount: amount, // Must be an integer
                currency: currency,
                name: 'Food Delivery',
                description: 'Order Payment',
                order_id: order_id,
                handler: async function (response) {
                    const data = {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    const verifyResult = await axios.post('https://food-delivery-backend-1-rn4y.onrender.com/api/payment/verify-payment', data, config);

                    if (verifyResult.data.message === 'Payment verified successfully') {
                        // Save Order
                        const newOrder = {
                            id: 'ORD' + Math.floor(Math.random() * 1000000),
                            date: new Date().toISOString(),
                            status: 'Preparing',
                            total: grandTotal,
                            items: JSON.parse(localStorage.getItem('cartItems')) || [],
                            ...formData,
                            paymentId: response.razorpay_payment_id
                        };

                        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
                        localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

                        toast.success('Payment Successful & Order Placed!');
                        clearCart();
                        navigate(`/order/${newOrder.id}`);
                    } else {
                        toast.error('Payment Verification Failed!');
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: '#e11d48', // Tailwind primary red-600 approx
                },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (error) {
            console.error(error);
            toast.error('Something went wrong during payment initialization.');
        }
    };

    if (totalAmount === 0) {
        return <div className="container py-10 text-center text-xl font-semibold text-gray-500">Cart is empty</div>;
    }

    return (
        <div className="container py-10 min-h-[80vh]">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100" onSubmit={handleSubmit}>
                        <h3 className="text-xl font-bold text-gray-800 mb-6">Delivery Address</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2 mb-8">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <button
                                    type="button"
                                    onClick={detectLocation}
                                    className="flex items-center text-sm text-primary hover:text-red-700 font-medium transition-colors cursor-pointer"
                                >
                                    <FaMapMarkerAlt className="mr-1" /> Auto Detect
                                </button>
                            </div>
                            <textarea
                                name="address"
                                required
                                value={formData.address}
                                className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                                onChange={handleChange}
                                placeholder="Enter your full address"
                            ></textarea>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800 mb-4 pt-6 border-t border-gray-100">Payment Method</h3>
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="upi" className="peer sr-only" onChange={handleChange} />
                                <div className="border border-gray-200 rounded-xl p-4 peer-checked:border-primary peer-checked:bg-red-50 hover:bg-gray-50 transition-all text-center">
                                    <span className="font-semibold text-gray-700 peer-checked:text-primary">UPI</span>
                                </div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="card" className="peer sr-only" onChange={handleChange} />
                                <div className="border border-gray-200 rounded-xl p-4 peer-checked:border-primary peer-checked:bg-red-50 hover:bg-gray-50 transition-all text-center">
                                    <span className="font-semibold text-gray-700 peer-checked:text-primary">Card</span>
                                </div>
                            </label>
                            <label className="flex-1 cursor-pointer">
                                <input type="radio" name="paymentMethod" value="cod" defaultChecked className="peer sr-only" onChange={handleChange} />
                                <div className="border border-gray-200 rounded-xl p-4 peer-checked:border-primary peer-checked:bg-red-50 hover:bg-gray-50 transition-all text-center">
                                    <span className="font-semibold text-gray-700 peer-checked:text-primary">Cash on Delivery</span>
                                </div>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-red-600 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            Place Order
                        </button>
                    </form>
                </div>

                <div className="h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Item Total</span>
                            <span>₹{totalAmount}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Delivery Fee</span>
                            <span>₹{deliveryCharge}</span>
                        </div>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex justify-between text-gray-900 font-bold text-lg">
                            <span>Grand Total</span>
                            <span>₹{grandTotal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
