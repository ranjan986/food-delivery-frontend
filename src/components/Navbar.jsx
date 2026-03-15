import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { getCartCount } = useCart();
    const { user, logout } = useAuth();
    console.log("Navbar User:", user); // Debugging: Check user object and role

    return (
        <nav className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md z-50 py-4">
            <div className="container flex justify-between items-center">
                <Link to="/" className="text-3xl font-extrabold text-primary tracking-tight hover:scale-105 transition-transform">
                    QuickBite<span className="text-secondary">.</span>
                </Link>

                <ul className="hidden md:flex gap-8 font-medium text-gray-700">
                    {['Home', 'Restaurants', 'Offers', 'About', 'Contact'].map((item) => (
                        <li key={item}>
                            <Link
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="hover:text-primary transition-colors relative group py-2"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-6">
                    <Link to="/cart" className="relative text-2xl text-gray-700 hover:text-primary transition-colors hover:scale-110 duration-200">
                        <FaShoppingCart />
                        {getCartCount() > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex justify-center items-center shadow-md">
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="relative group">
                            <button className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-50 transition-colors">
                                <span className="font-semibold text-gray-700">Hi, {user.name.split(' ')[0]}</span>
                                <svg className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-right z-50">
                                <Link
                                    to="/orders"
                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                >
                                    My Orders
                                </Link>
                                {user.role === 'admin' && (
                                    <Link
                                        to="/admin"
                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                    >
                                        Admin Panel
                                    </Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 font-semibold transition-colors border-t border-gray-50"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login">
                            <button
                                className="flex items-center px-6 py-2.5 bg-gradient-to-r from-primary to-orange-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all transform"
                            >
                                <FaUser className="mr-2" /> Login
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
