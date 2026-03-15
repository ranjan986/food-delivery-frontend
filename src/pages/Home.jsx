import React from 'react';
import Hero from '../components/Hero';
import PopularCategories from '../components/PopularCategories';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
    return (
        <div>
            <Hero />
            <PopularCategories />
            <RestaurantList />
        </div>
    );
};

export default Home;
