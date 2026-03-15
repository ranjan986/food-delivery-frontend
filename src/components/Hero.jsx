import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
            </div>

            <div className="container relative z-10 px-5 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-2xl">
                        Delicious Food, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
                            Delivered Fast.
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl mb-10 opacity-90 font-light max-w-2xl mx-auto text-gray-200">
                        Discover the best restaurants in your city and get fresh meals delivered to your doorstep in minutes.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex flex-col md:flex-row bg-white/10 backdrop-blur-md p-3 rounded-full shadow-2xl max-w-3xl mx-auto border border-white/20"
                >
                    <div className="flex-1 flex items-center px-6">
                        <FaSearch className="text-gray-300 text-xl mr-4" />
                        <input
                            type="text"
                            placeholder="Enter your delivery location..."
                            className="w-full bg-transparent text-white placeholder-gray-200 text-lg outline-none"
                        />
                    </div>
                    <button
                        onClick={() => document.getElementById('restaurants')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-2 md:mt-0 bg-gradient-to-r from-primary to-red-600 text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all transform uppercase tracking-wider"
                    >
                        Find Food
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-12 flex justify-center gap-8 text-sm font-medium text-gray-300/80"
                >
                    <span>🍔 10,000+ Restaurants</span>
                    <span>🚀 30 Min Delivery</span>
                    <span>⭐ 4.8/5 App Rating</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
