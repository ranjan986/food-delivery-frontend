import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const AddMenu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        foodImage: '',
        category: '',
        isVeg: true,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedUser = localStorage.getItem('food_delivery_user');
            const token = storedUser ? JSON.parse(storedUser).token : null;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const dataToSend = {
                name: formData.title,
                description: formData.description,
                price: Number(formData.price),
                image: formData.foodImage,
                category: formData.category,
                isVeg: formData.isVeg,
                restaurantId: id,
                resturnatName: 'Restaurant Name Placeholder',
                rating: 4.5,
                ratingCount: '100+'
            };

            await axios.post(`https://food-delivery-backend-1-rn4y.onrender.com/api/restaurants/${id}/menu`, dataToSend, config);
            toast.success('Menu Item Added Successfully');
            navigate('/admin');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add menu item');
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Add Menu Item</h1>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 h-24 resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                        <input
                            type="text"
                            name="foodImage"
                            value={formData.foodImage}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category (e.g., Pizza, Burger)</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isVeg"
                            checked={formData.isVeg}
                            onChange={(e) => setFormData({ ...formData, isVeg: e.target.checked })}
                            className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                        <label className="text-sm font-medium text-gray-700">Is Veg?</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddMenu;
