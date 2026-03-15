import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('food_delivery_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('https://food-delivery-backend-1-rn4y.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data);
                localStorage.setItem('food_delivery_user', JSON.stringify(data));
                toast.success('Login successful!');
                return true;
            } else {
                toast.error(data.message || 'Login failed');
                return false;
            }
        } catch (error) {
            toast.error('Something went wrong');
            return false;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const response = await fetch('https://food-delivery-backend-1-rn4y.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setUser(data);
                localStorage.setItem('food_delivery_user', JSON.stringify(data));
                toast.success('Registration successful!');
                return true;
            } else {
                toast.error(data.message || 'Registration failed');
                return false;
            }
        } catch (error) {
            toast.error('Something went wrong');
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('food_delivery_user');
        toast.info('Logged out');
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
