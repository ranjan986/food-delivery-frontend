import React from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaClock, FaRupeeSign } from 'react-icons/fa';
import FoodItemCard from '../components/FoodItemCard';
import Burger from '../assets/Burgur.avif';
import Biryani from '../assets/Briyani.avif';
import Fries from '../assets/CHICKEN.webp';
import ChickenWings from '../assets/chicken-wings.avif';

// Mock Data
const restaurantData = {
    id: 1,
    name: 'The Burger Club',
    rating: 4.5,
    ratingCount: '1K+ ratings',
    cuisine: 'American, Fast Food',
    address: 'Sector 29, Gurgaon',
    deliveryTime: '30-40 mins',
    costForTwo: 350,
    menu: [
        {
            id: 101,
            name: 'Classic Cheese Burger',
            price: 189,
            description: 'Juicy beef patty with cheddar cheese, lettuce, tomato and house sauce.',
            isVeg: false,
            imageUrl: Burger
        },
        {
            id: 102,
            name: 'Crispy Veg Burger',
            price: 149,
            description: 'Crispy vegetable patty topped with mayo and fresh onions.',
            isVeg: true,
            imageUrl: Biryani
        },
        {
            id: 103,
            name: 'Peri Peri Fries',
            price: 109,
            description: 'Golden fries tossed in spicy peri peri seasoning.',
            isVeg: true,
            imageUrl: Fries
        },
        {
            id: 104,
            name: 'Chicken Wings (6 pcs)',
            price: 249,
            description: 'Spicy buffalo wings served with ranch dip.',
            isVeg: false,
            imageUrl: ChickenWings
        }
    ]
};

const RestaurantMenu = () => {
    const { id } = useParams();
    const restaurant = restaurantData;

    return (
        <div className="pt-8 min-h-screen pb-20">
            <div className="container max-w-4xl">
                {/* Header */}
                <div className="pb-8 border-b border-dashed border-gray-300 mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                        <p className="text-sm text-gray-500 mb-1">{restaurant.cuisine}</p>
                        <p className="text-sm text-gray-400">{restaurant.address}, {restaurant.deliveryTime}</p>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-2 text-center bg-white shadow-sm flex flex-col items-center">
                        <span className="text-green-600 font-bold text-lg pb-1 border-b border-gray-100 mb-1 flex items-center gap-1">
                            <FaStar className="text-sm" /> {restaurant.rating}
                        </span>
                        <span className="text-[10px] text-gray-500 font-semibold tracking-tight">{restaurant.ratingCount}</span>
                    </div>
                </div>

                {/* Menu */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-1 h-8 bg-primary block rounded-full"></span>
                        Recommended
                    </h3>
                    <div className="space-y-2">
                        {restaurant.menu.map(item => (
                            <FoodItemCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantMenu;
