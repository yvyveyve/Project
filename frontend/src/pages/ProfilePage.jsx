import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: '3rem 0' }}>
            <div className="container">
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
                        <h1 style={{ marginBottom: '1rem' }}>Profile</h1>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <p><strong>Name:</strong> {user?.name}</p>
                            <p><strong>Email:</strong> {user?.email}</p>
                            <p><strong>Role:</strong> <span className="badge">{user?.role}</span></p>
                        </div>
                    </div>

                    <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Quick Links</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <Link to="/orders" className="btn btn-outline">My Orders</Link>
                            <Link to="/products" className="btn btn-outline">Browse Products</Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="btn btn-primary">Admin Dashboard</Link>
                            )}
                        </div>
                    </div>

                    <button onClick={logout} className="btn btn-secondary" style={{ width: '100%' }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
