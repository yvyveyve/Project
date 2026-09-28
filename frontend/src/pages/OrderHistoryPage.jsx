import { useState, useEffect } from 'react';
import api from '../utils/api';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        const classes = {
            'Processing': 'badge-warning',
            'Shipped': 'badge',
            'Delivered': 'badge-success'
        };
        return `badge ${classes[status] || ''}`;
    };

    if (loading) {
        return <div className="loading-container"><div className="spinner"></div></div>;
    }

    return (
        <div style={{ padding: '3rem 0' }}>
            <div className="container">
                <h1 style={{ marginBottom: '2rem' }}>Order History</h1>

                {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <p>No orders yet</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {orders.map(order => (
                            <div key={order._id} style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <div>
                                        <h3 style={{ marginBottom: '0.5rem' }}>Order #{order.orderNumber}</h3>
                                        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span className={getStatusBadgeClass(order.status)}>{order.status}</span>
                                        <p style={{ marginTop: '0.5rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
                                            KSh {order.totalAmount.toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem' }}>
                                    <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}><strong>Items:</strong></p>
                                    {order.items.slice(0, 3).map((item, idx) => (
                                        <p key={idx} style={{ fontSize: '0.875rem', color: '#64748B' }}>
                                            {item.title} x {item.quantity}
                                        </p>
                                    ))}
                                    {order.items.length > 3 && (
                                        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
                                            +{order.items.length - 3} more items
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistoryPage;
