import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheck, FaMotorcycle, FaUtensils, FaBoxOpen, FaMapMarkerAlt } from 'react-icons/fa';

const OrderTracking = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetching order details
        const fetchOrder = () => {
            const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
            const foundOrder = allOrders.find(o => o.id === id);

            if (foundOrder) {
                setOrder(foundOrder);
            }
            setLoading(false);
        };

        fetchOrder();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading tracking info...</div>;

    if (!order) return <div className="text-center py-20">Order not found.</div>;

    const steps = [
        { label: 'Order Placed', icon: <FaBoxOpen />, status: 'completed' },
        { label: 'Preparing', icon: <FaUtensils />, status: 'completed' },
        { label: 'Out for Delivery', icon: <FaMotorcycle />, status: 'active' },
        { label: 'Delivered', icon: <FaMapMarkerAlt />, status: 'pending' },
    ];

    // Simple logic to determine active step based on order status string
    // In a real app, this would be more robust
    const getStepStatus = (index) => {
        if (order.status === 'Cancelled') return 'pending'; // Reset steps if cancelled
        if (order.status === 'Delivered') return 'completed';
        if (order.status === 'Preparing' && index <= 1) return 'completed';
        if (order.status === 'Out for Delivery' && index <= 2) return 'completed';
        if (index === 0) return 'completed'; // Order placed always done
        return 'pending';
    }

    const handleCancelOrder = () => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            const updatedOrder = { ...order, status: 'Cancelled' };
            setOrder(updatedOrder);

            // Update in local storage
            const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
            const updatedOrders = allOrders.map(o => o.id === order.id ? updatedOrder : o);
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
        }
    };

    return (
        <div className="container py-10 max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div className="flexjustify-between items-center mb-8 border-b border-gray-50 pb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Order Tracking</h2>
                        <p className="text-gray-500 text-sm">Order ID: #{id.slice(-6).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                        {order.status === 'Cancelled' ? (
                            <span className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold">Cancelled</span>
                        ) : (
                            <>
                                <p className="text-sm text-gray-500">Estimated Delivery</p>
                                <p className="text-xl font-bold text-gray-800">30-40 mins</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="relative flex justify-between items-start w-full mb-12 px-4">
                    {/* Progress Bar Background */}
                    <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-10"></div>

                    {/* Progress Bar Fill - Mock width for demo */}
                    <div className="absolute top-5 left-0 h-1 bg-green-500 -z-10 transition-all duration-1000" style={{ width: '60%' }}></div>

                    {steps.map((step, index) => {
                        const status = getStepStatus(index);
                        const isCompleted = status === 'completed';
                        const isActive = status === 'active'; // This logic needs refinement based on real status

                        return (
                            <div key={index} className="flex flex-col items-center group">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg z-10 transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white shadow-lg shadow-green-200' :
                                    'bg-white border-2 border-gray-200 text-gray-300'
                                    }`}>
                                    {isCompleted ? <FaCheck /> : step.icon}
                                </div>
                                <span className={`mt-3 text-sm font-semibold transition-colors ${isCompleted ? 'text-gray-800' : 'text-gray-400'
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                    <h3 className="font-bold text-gray-800 mb-4">Order Details</h3>
                    <ul className="space-y-3">
                        {order.items.map((item, idx) => (
                            <li key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-600"><span className="font-bold text-gray-800">{item.quantity}x</span> {item.name}</span>
                                <span className="font-semibold text-gray-700">₹{item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between font-bold text-lg text-gray-800">
                        <span>Total Paid</span>
                        <span>₹{order.total}</span>
                    </div>
                </div>

                {/* Cancel Button */}
                {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <button
                            onClick={handleCancelOrder}
                            className="text-red-500 font-bold hover:text-red-600 hover:bg-red-50 px-6 py-3 rounded-full transition-all"
                        >
                            Cancel Order
                        </button>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link to="/orders" className="text-primary font-semibold hover:underline">
                        Back to My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;
