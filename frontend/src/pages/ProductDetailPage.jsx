import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data } = await api.get(`/products/${id}`);
            setProduct(data.data);
            if (data.data.sizes?.length) setSelectedSize(data.data.sizes[0]);
            if (data.data.colors?.length) setSelectedColor(data.data.colors[0]);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        if (!selectedSize) {
            setMessage({ type: 'error', text: 'Please select a size' });
            return;
        }

        const result = await addToCart(product._id, quantity, selectedSize, selectedColor);
        if (result.success) {
            setMessage({ type: 'success', text: 'Added to cart!' });
            setTimeout(() => setMessage(null), 3000);
        } else {
            setMessage({ type: 'error', text: result.message });
        }
    };

    if (loading) {
        return <div className="loading-container"><div className="spinner"></div></div>;
    }

    if (!product) {
        return <div className="container"><p>Product not found</p></div>;
    }

    return (
        <div className="product-detail-page">
            <div className="container">
                <div className="product-detail-layout">
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={product.images[selectedImage]} alt={product.title} />
                        </div>
                        {product.images.length > 1 && (
                            <div className="image-thumbnails">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        className={`thumbnail ${selectedImage === idx ? 'active' : ''}`}
                                        onClick={() => setSelectedImage(idx)}
                                    >
                                        <img src={img} alt={`${product.title} ${idx + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-details">
                        <h1 className="product-title">{product.title}</h1>
                        <div className="product-meta">
                            <span className="product-category">{product.category}</span>
                            {product.rating > 0 && (
                                <span className="product-rating">⭐ {product.rating} ({product.reviews} reviews)</span>
                            )}
                        </div>
                        <div className="product-price">KSh {product.price.toLocaleString()}</div>
                        <p className="product-description">{product.description}</p>

                        {product.sizes && product.sizes.length > 0 && (
                            <div className="product-option">
                                <label>Size</label>
                                <div className="size-options">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.colors && product.colors.length > 0 && (
                            <div className="product-option">
                                <label>Color: {selectedColor?.name}</label>
                                <div className="color-options">
                                    {product.colors.map(color => (
                                        <button
                                            key={color.name}
                                            className={`color-btn ${selectedColor?.name === color.name ? 'active' : ''}`}
                                            style={{ backgroundColor: color.hex }}
                                            onClick={() => setSelectedColor(color)}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="product-option">
                            <label>Quantity</label>
                            <div className="quantity-control">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</button>
                            </div>
                            <span className="stock-info">{product.stock} items in stock</span>
                        </div>

                        {message && (
                            <div className={`message ${message.type}`}>{message.text}</div>
                        )}

                        <button
                            className="btn btn-primary btn-lg add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
