import React from 'react';

const About = () => {
    return (
        <div className="container py-20 min-h-[60vh]">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">About QuickBite</h2>
                <div className="prose prose-lg mx-auto text-gray-600">
                    <p className="mb-6">
                        QuickBite is your go-to food delivery app, designed to bring delicious meals from your favorite restaurants straight to your doorstep. We believe in speed, quality, and convenience.
                    </p>
                    <p>
                        Founded in 2024, our mission is to connect food lovers with the best culinary experiences in their city. Whether you're craving a cheesy pizza, a spicy biryani, or a sweet dessert, we've got you covered.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
