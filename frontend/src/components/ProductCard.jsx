import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/products/${product._id}`} className="product-card">
            <div className="product-image">
                <img src={product.images[0]} alt={product.title} />
                {product.featured && <span className="product-badge badge-featured">Featured</span>}
                {product.trending && <span className="product-badge badge-trending">Trending</span>}
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-category">{product.category}</p>
                <div className="product-footer">
                    <span className="product-price">KSh {product.price.toLocaleString()}</span>
                    {product.rating > 0 && (
                        <span className="product-rating">
                            ⭐ {product.rating} ({product.reviews})
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
