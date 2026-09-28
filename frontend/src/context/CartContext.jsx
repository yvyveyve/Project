import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        try {
            const { data } = await api.get('/cart');
            if (data.success) {
                setCart(data.data);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    const addToCart = async (productId, quantity, size, color) => {
        setLoading(true);
        try {
            const { data } = await api.post('/cart/add', {
                productId,
                quantity,
                size,
                color
            });

            if (data.success) {
                setCart(data.data);
                return { success: true };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to add to cart'
            };
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (productId, quantity, size, color) => {
        setLoading(true);
        try {
            const { data } = await api.put('/cart/update', {
                productId,
                quantity,
                size,
                color
            });

            if (data.success) {
                setCart(data.data);
                return { success: true };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to update cart'
            };
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId, size, color) => {
        setLoading(true);
        try {
            const { data } = await api.delete(`/cart/remove/${productId}`, {
                params: { size, color: color?.name }
            });

            if (data.success) {
                setCart(data.data);
                return { success: true };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Failed to remove from cart'
            };
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            const { data } = await api.delete('/cart/clear');
            if (data.success) {
                setCart({ items: [] });
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const cartTotal = cart.items?.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0) || 0;

    const cartItemCount = cart.items?.reduce((count, item) => {
        return count + item.quantity;
    }, 0) || 0;

    const value = {
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
        cartTotal,
        cartItemCount
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
