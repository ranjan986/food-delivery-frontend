import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import Skeleton from './Skeleton';
import American from '../assets/American-food.jpg';
import pizza from '../assets/pizza.avif';

// Mock Data
const restaurants = [
    {
        id: 1,
        name: 'The Burger Club',
        rating: 4.5,
        cuisine: 'American, Fast Food',
        deliveryTime: 30,
        costForTwo: 350,
        imageUrl: American,
        distance: '3.5',
        offer: '50% OFF'
    },
    {
        id: 2,
        name: 'Pizza Hut',
        rating: 4.2,
        cuisine: 'Italian, Pizza',
        deliveryTime: 40,
        costForTwo: 500,
        imageUrl: pizza,
        distance: '4.2',
        offer: 'Free Delivery'
    },
    {
        id: 3,
        name: 'Spicy Treats',
        rating: 3.8,
        cuisine: 'Indian, Biryani',
        deliveryTime: 25,
        costForTwo: 250,
        imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop',
        distance: '2.0',
        offer: '20% OFF'
    },
    {
        id: 4,
        name: 'Asian Wok',
        rating: 4.4,
        cuisine: 'Chinese, Asian',
        deliveryTime: 35,
        costForTwo: 450,
        imageUrl: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop',
        distance: '5.1'
    },
    {
        id: 5,
        name: 'Dessert Haven',
        rating: 4.8,
        cuisine: 'Desserts, Bakery',
        deliveryTime: 20,
        costForTwo: 200,
        imageUrl: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop',
        distance: '1.8',
        offer: 'Buy 1 Get 1'
    },
    {
        id: 6,
        name: 'South Taste',
        rating: 4.1,
        cuisine: 'South Indian',
        deliveryTime: 30,
        costForTwo: 300,
        imageUrl: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e0?q=80&w=800&auto=format&fit=crop',
        distance: '6.5'
    }
];

const RestaurantList = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section id="restaurants" className="py-16 bg-gray-50">
            <div className="container">
                <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Top Restaurants Near You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                    {loading ? (
                        Array(8).fill().map((_, index) => (
                            <div key={index} className="mb-5">
                                <Skeleton type="thumbnail" />
                                <div className="mt-4">
                                    <Skeleton type="title" />
                                    <Skeleton type="text" />
                                </div>
                            </div>
                        ))
                    ) : (
                        restaurants.map(restaurant => (
                            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default RestaurantList;
