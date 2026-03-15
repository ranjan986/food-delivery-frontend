import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // In a real app, you would fetch from your backend
                // Constance response = await axios.get('/api/orders/myorders');
                // setOrders(response.data);

                // Mock data for demonstration until backend is fully connected
                setTimeout(() => {
                    const mockOrders = JSON.parse(localStorage.getItem('orders')) || [];
                    setOrders(mockOrders.reverse()); // Show newest first
                    setLoading(false);
                }, 1000);

            } catch (error) {
                console.error("Error fetching orders:", error);
                setLoading(false);
            }
        };

        if (user) {
            fetchOrders();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading your orders...</div>;
    }

    if (!user) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your orders</h2>
                <Link to="/login" className="text-primary hover:underline">Go to Login</Link>
            </div>
        );
    }

    return (
        <div className="container py-10 min-h-[80vh]">
            <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">My Orders</h2>

            {orders.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-500 text-lg mb-6">No orders found.</p>
                    <Link to="/" className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-red-600 transition-colors">
                        Start Ordering
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                        Order #{order.id.slice(-6).toUpperCase()}
                                    </span>
                                    <span className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                                </h3>
                                <p className="text-gray-500 text-sm mt-1">{order.items.length} items for <span className="font-bold text-gray-800">₹{order.total}</span></p>
                            </div>

                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    {order.status}
                                </div>
                                <Link
                                    to={`/order/${order.id}`}
                                    className="px-5 py-2 border border-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Track Order
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
