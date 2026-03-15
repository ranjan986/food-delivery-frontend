import React from 'react';
import RestaurantList from '../components/RestaurantList';
import PopularCategories from '../components/PopularCategories';

const Restaurants = () => {
    return (
        <div className="pt-20">
            <div className="container text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800">All Restaurants</h2>
                <p className="text-gray-500 mt-2">Explore the best food around you</p>
            </div>
            <PopularCategories />
            <RestaurantList />
        </div>
    );
};

export default Restaurants;
