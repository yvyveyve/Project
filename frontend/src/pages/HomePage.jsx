import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import './HomePage.css';

const HomePage = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const [featured, trending] = await Promise.all([
                api.get('/products?featured=true'),
                api.get('/products?trending=true')
            ]);

            setFeaturedProducts(featured.data.data.slice(0, 4));
            setTrendingProducts(trending.data.data.slice(0, 4));
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = [
        { name: 'T-Shirts', emoji: '👕', path: '/products?category=T-Shirts' },
        { name: 'Hoodies', emoji: '🧥', path: '/products?category=Hoodies' },
        { name: 'Jeans', emoji: '👖', path: '/products?category=Jeans' },
        { name: 'Shoes', emoji: '👟', path: '/products?category=Shoes' },
        { name: 'Dresses', emoji: '👗', path: '/products?category=Dresses' },
        { name: 'Accessories', emoji: '🎒', path: '/products?category=Accessories' }
    ];

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Discover Your <span className="gradient-text">Perfect Style</span>
                        </h1>
                        <p className="hero-subtitle">
                            Shop the latest fashion trends with free shipping on orders over KSh 5,000
                        </p>
                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary btn-lg">
                                Shop Now
                            </Link>
                            <Link to="/products?trending=true" className="btn btn-secondary btn-lg">
                                View Trending
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories-section">
                <div className="container">
                    <h2 className="section-title">Shop by Category</h2>
                    <div className="categories-grid">
                        {categories.map(cat => (
                            <Link key={cat.name} to={cat.path} className="category-card">
                                <span className="category-emoji">{cat.emoji}</span>
                                <h3>{cat.name}</h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="products-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <Link to="/products?featured=true" className="view-all-link">
                            View All →
                        </Link>
                    </div>
                    <div className="products-grid">
                        {featuredProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Products */}
            <section className="products-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Trending Now</h2>
                        <Link to="/products?trending=true" className="view-all-link">
                            View All →
                        </Link>
                    </div>
                    <div className="products-grid">
                        {trendingProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
