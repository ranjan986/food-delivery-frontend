import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const totalAmount = getCartTotal();
    const deliveryCharge = totalAmount > 0 ? 40 : 0;
    const grandTotal = totalAmount + deliveryCharge;

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" className="w-64 mb-6 opacity-80" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Go ahead and explore top restaurants.</p>
                <Link to="/" className="bg-primary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-red-600 transition-all">
                    Browse Restaurants
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-10 min-h-[80vh]">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="space-y-6">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center pb-6 border-b border-gray-100 last:border-none last:pb-0">
                                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                                    <p className="text-gray-600">₹{item.price}</p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                                        <button
                                            onClick={() => item.quantity > 1 ? updateQuantity(item.id, -1) : removeFromCart(item.id)}
                                            className="px-3 py-1 text-green-600 font-bold hover:bg-gray-50"
                                        >-</button>
                                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="px-3 py-1 text-green-600 font-bold hover:bg-gray-50"
                                        >+</button>
                                    </div>
                                    <button
                                        className="text-xs text-red-500 hover:text-red-700 underline"
                                        onClick={() => removeFromCart(item.id)}
                                    >Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="mt-6 text-sm text-gray-500 hover:text-red-500 underline transition-colors"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </div>

                {/* Bill Summary */}
                <div className="h-fit bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Bill Details</h3>
                    <div className="space-y-3 mb-6">
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
                            <span>To Pay</span>
                            <span>₹{grandTotal}</span>
                        </div>
                    </div>
                    <button
                        className="w-full bg-black text-white py-4 rounded-xl font-bold shadow-lg hover:bg-red-600 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        onClick={() => navigate('/checkout')}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
