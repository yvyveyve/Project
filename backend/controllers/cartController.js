import mockData, { findProductById } from '../mockDatabase.js';

// Mock cart operations
export const getCart = async (req, res) => {
    try {
        const cart = mockData.carts[req.user._id] || { items: [] };
        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching cart' });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;
        const product = findProductById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        if (!mockData.carts[req.user._id]) {
            mockData.carts[req.user._id] = { items: [] };
        }

        const cart = mockData.carts[req.user._id];
        const existingIndex = cart.items.findIndex(
            i => i.product._id === productId && i.size === size && i.color?.name === color?.name
        );

        if (existingIndex > -1) {
            cart.items[existingIndex].quantity += quantity;
        } else {
            cart.items.push({ product, quantity, size, color, price: product.price });
        }

        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding to cart' });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity, size, color } = req.body;
        const cart = mockData.carts[req.user._id];

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(
            i => i.product._id === productId && i.size === size && i.color?.name === color?.name
        );

        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in cart' });
        }

        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        } else {
            cart.items[itemIndex].quantity = quantity;
        }

        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating cart' });
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const { size, color } = req.query;
        const cart = mockData.carts[req.user._id];

        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            i => !(i.product._id === productId && i.size === size && i.color?.name === color)
        );

        res.json({ success: true, data: cart });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing from cart' });
    }
};

export const clearCart = async (req, res) => {
    try {
        mockData.carts[req.user._id] = { items: [] };
        res.json({ success: true, data: { items: [] } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error clearing cart' });
    }
};
