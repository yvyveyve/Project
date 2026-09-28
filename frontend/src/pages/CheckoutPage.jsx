import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/api';
import './CheckoutPage.css';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { cart, cartTotal } = useCart();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        paymentMethod: 'credit_card',
        cardLast4: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const orderData = {
                items: cart.items.map(item => ({
                    product: item.product._id,
                    quantity: item.quantity,
                    size: item.size,
                    color: item.color
                })),
                deliveryAddress: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country
                },
                phone: formData.phone,
                paymentDetails: {
                    method: formData.paymentMethod,
                    cardLast4: formData.cardLast4,
                    transactionId: 'MOCK-' + Date.now()
                }
            };

            const { data } = await api.post('/orders', orderData);
            if (data.success) {
                navigate(`/order-confirmation/${data.data._id}`);
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Order failed');
        } finally {
            setLoading(false);
        }
    };

    const shipping = cartTotal > 50 ? 0 : 5;
    const total = cartTotal + shipping;

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>
                <div className="checkout-layout">
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <section className="form-section">
                            <h2>Delivery Address</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Street Address *</label>
                                    <input type="text" name="street" required value={formData.street} onChange={handleChange} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>City *</label>
                                    <input type="text" name="city" required value={formData.city} onChange={handleChange} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>State *</label>
                                    <input type="text" name="state" required value={formData.state} onChange={handleChange} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>ZIP Code *</label>
                                    <input type="text" name="zipCode" required value={formData.zipCode} onChange={handleChange} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>Country *</label>
                                    <input type="text" name="country" required value={formData.country} onChange={handleChange} className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number *</label>
                                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="form-input" />
                                </div>
                            </div>
                        </section>

                        <section className="form-section">
                            <h2>Payment Details</h2>
                            <div className="form-group">
                                <label>Payment Method *</label>
                                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="form-select">
                                    <option value="credit_card">Credit Card</option>
                                    <option value="debit_card">Debit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="cash_on_delivery">Cash on Delivery</option>
                                </select>
                            </div>
                            {(formData.paymentMethod === 'credit_card' || formData.paymentMethod === 'debit_card') && (
                                <div className="form-group">
                                    <label>Card Last 4 Digits (Mock) *</label>
                                    <input type="text" name="cardLast4" required maxLength="4" value={formData.cardLast4} onChange={handleChange} className="form-input" placeholder="1234" />
                                </div>
                            )}
                        </section>

                        <button type="submit" className="btn btn-primary btn-lg submit-btn" disabled={loading}>
                            {loading ? 'Processing...' : `Place Order - KSh ${total.toLocaleString()}`}
                        </button>
                    </form>

                    <div className="order-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-items">
                            {cart.items?.map((item, idx) => (
                                <div key={idx} className="summary-item">
                                    <img src={item.product?.images?.[0]} alt={item.product?.title} />
                                    <div>
                                        <p>{item.product?.title}</p>
                                        <span>Qty: {item.quantity}</span>
                                    </div>
                                    <span>KSh {(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-totals">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>KSh {cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `KSh ${shipping.toLocaleString()}`}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>KSh {total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
