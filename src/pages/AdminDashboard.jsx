import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        foods: [],
        time: '',
        pickup: true,
        delivery: true,
        isOpen: true,
        logoUrl: '',
        rating: 4.5,
        ratingCount: '1K+',
        code: '',
        coords: {
            id: '123456',
            latitude: 12.3456,
            longitude: 12.3456,
            address: '123 Main St',
            title: 'Restaurant Location',
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121
        },
        cuisine: '',
        costForTwo: ''
    });

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/restaurants');
            setRestaurants(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const [uploading, setUploading] = useState(false);

    const uploadFileHandler = async (e, field) => {
        const file = e.target.files[0];
        const formDataUpload = new FormData();
        formDataUpload.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('http://localhost:5000/api/upload', formDataUpload, config);

            // Construct full URL including backend server
            const fullUrl = `http://localhost:5000${data.image}`;
            setFormData(prev => ({ ...prev, [field]: fullUrl }));
            setUploading(false);
            toast.success('Image uploaded!');
        } catch (error) {
            console.error(error);
            setUploading(false);
            toast.error('Image upload failed');
        }
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

            const payload = {
                name: formData.title,
                cuisine: formData.cuisine,
                address: formData.coords.address,
                deliveryTime: parseInt(formData.time) || 30,
                costForTwo: parseInt(formData.costForTwo) || 200,
                imageUrl: formData.imageUrl,
                logoUrl: formData.logoUrl
            };

            if (isEditing) {
                await axios.put(`http://localhost:5000/api/restaurants/${editId}`, payload, config);
                toast.success('Restaurant Updated Successfully');
            } else {
                await axios.post('http://localhost:5000/api/restaurants', payload, config);
                toast.success('Restaurant Added Successfully');
            }

            fetchRestaurants();
            setFormData({
                title: '',
                imageUrl: '',
                foods: [],
                time: '',
                pickup: true,
                delivery: true,
                isOpen: true,
                logoUrl: '',
                rating: 4.5,
                ratingCount: '1K+',
                code: '',
                coords: {
                    id: '123456',
                    latitude: 12.3456,
                    longitude: 12.3456,
                    address: '123 Main St',
                    title: 'Restaurant Location',
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.0121
                },
                cuisine: '',
                costForTwo: ''
            });
            setIsEditing(false);
            setEditId(null);
        } catch (error) {
            console.error(error);
            toast.error(isEditing ? 'Failed to update restaurant' : 'Failed to add restaurant');
        }
    };

    const handleEdit = (restaurant) => {
        setIsEditing(true);
        setEditId(restaurant._id || restaurant.id); // depending on backend model
        setFormData({
            ...formData,
            title: restaurant.name || restaurant.title || '',
            imageUrl: restaurant.imageUrl || '',
            time: restaurant.deliveryTime ? restaurant.deliveryTime.toString() : '',
            logoUrl: restaurant.logoUrl || '',
            coords: {
                ...formData.coords,
                address: restaurant.address || '',
            },
            cuisine: restaurant.cuisine || '',
            costForTwo: restaurant.costForTwo ? restaurant.costForTwo.toString() : ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this restaurant?')) return;

        try {
            const storedUser = localStorage.getItem('food_delivery_user');
            const token = storedUser ? JSON.parse(storedUser).token : null;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.delete(`http://localhost:5000/api/restaurants/${id}`, config);
            toast.success('Restaurant Deleted!');
            fetchRestaurants();
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete restaurant');
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

            <div className="bg-white p-6 rounded-lg shadow-md mb-10 border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6">{isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Image</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 mb-2"
                            placeholder="Enter Image URL or upload file"
                        />
                        <input
                            type="file"
                            onChange={(e) => uploadFileHandler(e, 'imageUrl')}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                        {uploading && <p className="text-sm text-blue-500 mt-1">Uploading...</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Logo</label>
                        <input
                            type="text"
                            name="logoUrl"
                            value={formData.logoUrl}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 mb-2"
                            placeholder="Enter Logo URL or upload file"
                        />
                        <input
                            type="file"
                            onChange={(e) => uploadFileHandler(e, 'logoUrl')}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine (e.g., Italian, Indian)</label>
                        <input
                            type="text"
                            name="cuisine"
                            value={formData.cuisine}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cost for Two (₹)</label>
                        <input
                            type="number"
                            name="costForTwo"
                            value={formData.costForTwo}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time (e.g., 30 min)</label>
                        <input
                            type="text"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.coords.address}
                            onChange={(e) => setFormData({ ...formData, coords: { ...formData.coords, address: e.target.value } })}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>

                    <div className="md:col-span-2 flex gap-4">
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            {isEditing ? 'Update Restaurant' : 'Add Restaurant'}
                        </button>
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditId(null);
                                    setFormData({
                                        title: '',
                                        imageUrl: '',
                                        foods: [],
                                        time: '',
                                        pickup: true,
                                        delivery: true,
                                        isOpen: true,
                                        logoUrl: '',
                                        rating: 4.5,
                                        ratingCount: '1K+',
                                        code: '',
                                        coords: {
                                            id: '123456',
                                            latitude: 12.3456,
                                            longitude: 12.3456,
                                            address: '123 Main St',
                                            title: 'Restaurant Location',
                                            latitudeDelta: 0.0122,
                                            longitudeDelta: 0.0121
                                        },
                                        cuisine: '',
                                        costForTwo: ''
                                    });
                                }}
                                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h2 className="text-2xl font-semibold mb-6">Manage Restaurants</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {restaurants.map((restaurant) => (
                        <div key={restaurant._id} className="border rounded-lg p-4 flex flex-col gap-4">
                            <img src={restaurant.imageUrl} alt={restaurant.title} className="w-full h-40 object-cover rounded-md" />
                            <div>
                                <h3 className="text-xl font-bold">{restaurant.name || restaurant.title}</h3>
                                <p className="text-gray-500 text-sm">{restaurant.address || (restaurant.coords?.address) || 'No Address Provided'}</p>
                            </div>
                            <div className="flex flex-col gap-2 mt-auto">
                                <button
                                    onClick={() => navigate(`/admin/restaurant/${restaurant._id}/add-menu`)}
                                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors text-center w-full"
                                >
                                    Add Menu Item
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(restaurant)}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-center flex-1"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(restaurant._id || restaurant.id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-center flex-1"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
