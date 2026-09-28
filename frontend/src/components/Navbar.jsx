import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
    const { cartItemCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${searchQuery}`);
            setSearchQuery('');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        setShowUserMenu(false);
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-logo">
                        <span className="logo-text">Yvought</span>
                        <span className="logo-icon">👕</span>
                    </Link>

                    <form className="navbar-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-btn">
                            🔍
                        </button>
                    </form>

                    <div className="navbar-actions">
                        <Link to="/products" className="nav-link">
                            Shop
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <Link to="/cart" className="cart-link">
                                    🛒
                                    {cartItemCount > 0 && (
                                        <span className="cart-badge">{cartItemCount}</span>
                                    )}
                                </Link>

                                <div className="user-menu">
                                    <button
                                        className="user-btn"
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                    >
                                        <span className="user-avatar">{user?.name?.charAt(0).toUpperCase()}</span>
                                    </button>
                                    {showUserMenu && (
                                        <div className="user-dropdown">
                                            <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                                Profile
                                            </Link>
                                            <Link to="/orders" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                                Orders
                                            </Link>
                                            {user?.role === 'admin' && (
                                                <Link to="/admin" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                                                    Admin Panel
                                                </Link>
                                            )}
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline btn-sm">
                                    Login
                                </Link>
                                <Link to="/signup" className="btn btn-primary btn-sm">
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
