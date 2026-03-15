import React from 'react';
import { FaStar, FaClock, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    return (
        <Link to={`/restaurant/${restaurant.id}`} className="block h-full group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full flex flex-col">

                {/* Image Section */}
                <div className="relative h-60 overflow-hidden">
                    <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                    {/* Offer Tag */}
                    {restaurant.offer && (
                        <div className="absolute top-4 left-0 bg-gradient-to-r from-red-600 to-orange-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-r-full shadow-md">
                            {restaurant.offer}
                        </div>
                    )}

                    {/* Delivery Time Badge */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm text-gray-700">
                        <FaClock className="text-orange-500" /> {restaurant.deliveryTime} mins
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 right-3 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                        {restaurant.rating} <FaStar className="text-[10px]" />
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-1">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {restaurant.name}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-1 mb-3">
                            {restaurant.cuisine}
                        </p>
                    </div>

                    {/* Footer Row: Price & Action */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-50 mt-auto">
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Cost for two</span>
                            <span className="text-sm font-bold text-gray-700">₹{restaurant.costForTwo}</span>
                        </div>

                        <button className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2">
                            View Menu <FaUtensils className="text-[10px]" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RestaurantCard;
