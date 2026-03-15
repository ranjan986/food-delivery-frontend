import React from 'react';
import { FaCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const FoodItemCard = ({ item }) => {
    const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();

    const cartItem = cartItems.find(p => p.id === item.id);
    const quantity = cartItem ? cartItem.quantity : 0;

    const handleAdd = () => {
        addToCart(item);
        toast.success(`${item.name} added to cart!`);
    };

    const handleIncrement = () => {
        addToCart(item);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            updateQuantity(item.id, -1);
        } else {
            removeFromCart(item.id);
        }
    };

    return (
        <div className="flex justify-between items-start py-8 border-b border-gray-100 last:border-none">
            <div className="flex-1 pr-4">
                <div className={`flex items-center gap-1.5 text-xs font-bold mb-1.5 ${item.isVeg ? 'text-green-600' : 'text-red-500'}`}>
                    <FaCircle className="text-[10px]" /> {item.isVeg ? 'Veg' : 'Non-Veg'}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                <span className="block text-base font-medium text-gray-700 mb-2.5">₹{item.price}</span>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[90%]">{item.description}</p>
            </div>
            <div className="relative w-36 h-36 flex-shrink-0">
                <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-md overflow-hidden w-24 h-9 flex items-center justify-center border border-gray-200">
                    {quantity === 0 ? (
                        <button
                            className="w-full h-full bg-white text-green-600 font-bold hover:bg-green-50 transition-colors uppercase text-sm"
                            onClick={handleAdd}
                        >
                            ADD
                        </button>
                    ) : (
                        <div className="flex justify-between items-center w-full h-full bg-white text-green-600 font-bold px-2">
                            <button onClick={handleDecrement} className="hover:scale-110 transition-transform text-lg">-</button>
                            <span className="text-sm">{quantity}</span>
                            <button onClick={handleIncrement} className="hover:scale-110 transition-transform text-lg">+</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FoodItemCard;
