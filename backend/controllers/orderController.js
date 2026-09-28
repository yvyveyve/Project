import mockData, { generateId } from '../mockDatabase.js';

export const createOrder = async (req, res) => {
    try {
        const { items, deliveryAddress, phone, paymentDetails } = req.body;
        const totalAmount = items.reduce((sum, item) => sum + (item.quantity * findProductById(item.product)?.price || 0), 0);

        const order = {
            _id: generateId('order'),
            orderNumber: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            user: req.user._id,
            items: items.map(item => ({
                ...item,
                title: findProductById(item.product)?.title,
                image: findProductById(item.product)?.images[0]
            })),
            totalAmount: totalAmount + (totalAmount > 50 ? 0 : 5),
            deliveryAddress,
            phone,
            paymentDetails,
            status: 'Processing',
            createdAt: new Date()
        };

        if (!mockData.orders[req.user._id]) {
            mockData.orders[req.user._id] = [];
        }
        mockData.orders[req.user._id].push(order);
        mockData.carts[req.user._id] = { items: [] };

        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating order' });
    }
};

const findProductById = (id) => mockData.products.find(p => p._id === id);

export const getOrders = async (req, res) => {
    try {
        const orders = mockData.orders[req.user._id] || [];
        res.json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};

export const getOrder = async (req, res) => {
    try {
        const orders = mockData.orders[req.user._id] || [];
        const order = orders.find(o => o._id === req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching order' });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        let order;

        for (const userId in mockData.orders) {
            const found = mockData.orders[userId].find(o => o._id === req.params.id);
            if (found) {
                found.status = status;
                order = found;
                break;
            }
        }

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating order' });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = Object.values(mockData.orders).flat();
        res.json({ success: true, count: allOrders.length, data: allOrders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching orders' });
    }
};
