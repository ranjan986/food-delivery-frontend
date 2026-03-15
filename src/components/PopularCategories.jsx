import React from 'react';
import Pizza from '../assets/pizza.avif';
import Burger from '../assets/Burgur.avif';
import Biryani from '../assets/Briyani.avif';
import Desserts from '../assets/Desserts.avif';
import ChickenWings from '../assets/chicken-wings.avif';
import Fries from '../assets/CHICKEN.webp';

const categories = [
    {
        id: 1,
        name: 'Pizza',
        count: '20+ Options',
        image: Pizza
    },
    {
        id: 2,
        name: 'Burger',
        count: '15+ Options',
        image: Burger
    },
    {
        id: 3,
        name: 'Biryani',
        count: '10+ Options',
        image: Biryani
    },

    {
        id: 4,
        name: 'Desserts',
        count: '30+ Options',
        image: Desserts
    },

    {
        id: 5,
        name: 'Chicken Wings',
        count: '10+ Options',
        image: ChickenWings
    },

    {
        id: 6,
        name: 'Fries',
        count: '10+ Options',
        image: Fries
    },

];

const PopularCategories = () => {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Explore by Category</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">Discover the best food from top-rated restaurants across the city.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative group overflow-hidden rounded-3xl h-64 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 bg-gray-900"
                        >
                            {/* Background Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-5 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{category.name}</h3>
                                <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{category.count}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularCategories;
