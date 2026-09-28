import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const { data } = await api.get(`/orders/${orderId}`);
            setOrder(data.data);
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-container"><div className="spinner"></div></div>;
    }

    if (!order) {
        return <div className="container"><p>Order not found</p></div>;
    }

    return (
        <div className="order-confirmation-page" style={{ padding: '3rem 0' }}>
            <div className="container">
                <div className="confirmation-card" style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '3rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                    <h1 style={{ marginBottom: '0.5rem' }}>Order Confirmed!</h1>
                    <p style={{ color: '#64748B', marginBottom: '2rem' }}>Order #{order.orderNumber}</p>

                    <div style={{ textAlign: 'left', background: '#F1F5F9', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Order Details</h3>
                        <p><strong>Total:</strong> KSh {order.totalAmount.toLocaleString()}</p>
                        <p><strong>Status:</strong> <span className="badge badge-success">{order.status}</span></p>
                        <p><strong>Delivery Address:</strong></p>
                        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                            {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link to="/orders" className="btn btn-primary">View Orders</Link>
                        <Link to="/products" className="btn btn-secondary">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
