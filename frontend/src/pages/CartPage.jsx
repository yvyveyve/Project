import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
    const navigate = useNavigate();
    const { cart, updateCartItem, removeFromCart, cartTotal } = useCart();

    const handleUpdateQuantity = async (item, newQuantity) => {
        if (newQuantity < 1) {
            await removeFromCart(item.product._id, item.size, item.color);
        } else {
            await updateCartItem(item.product._id, newQuantity, item.size, item.color);
        }
    };

    const handleRemove = async (item) => {
        await removeFromCart(item.product._id, item.size, item.color);
    };

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <h2>Your cart is empty</h2>
                        <p>Add some items to get started!</p>
                        <Link to="/products" className="btn btn-primary">
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1>Shopping Cart</h1>
                <div className="cart-layout">
                    <div className="cart-items">
                        {cart.items.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.product?.images?.[0]} alt={item.product?.title} />
                                <div className="item-details">
                                    <h3>{item.product?.title}</h3>
                                    <p className="item-meta">
                                        Size: {item.size} | Color: {item.color?.name}
                                    </p>
                                    <p className="item-price">KSh {item.price.toLocaleString()}</p>
                                </div>
                                <div className="item-actions">
                                    <div className="quantity-control">
                                        <button onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                                    </div>
                                    <button className="remove-btn" onClick={() => handleRemove(item)}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>KSh {cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping</span>
                            <span>{cartTotal > 5000 ? 'FREE' : 'KSh 500'}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>KSh {(cartTotal + (cartTotal > 5000 ? 0 : 500)).toLocaleString()}</span>
                        </div>
                        <button className="btn btn-primary btn-lg checkout-btn" onClick={() => navigate('/checkout')}>
                            Proceed to Checkout
                        </button>
                        <Link to="/products" className="continue-shopping">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
