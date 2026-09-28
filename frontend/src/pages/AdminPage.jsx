import { useState } from 'react';
import api from '../utils/api';

const AdminPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        images: '',
        sizes: 'S,M,L,XL',
        colors: 'Black,White',
        stock: '50',
        category: 'T-Shirts'
    });
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = {
                title: formData.title,
                description: formData.description,
                price: parseFloat(formData.price),
                images: formData.images.split(',').map(img => img.trim()),
                sizes: formData.sizes.split(',').map(s => s.trim()),
                colors: formData.colors.split(',').map(c => ({ name: c.trim(), hex: '#000000' })),
                stock: parseInt(formData.stock),
                category: formData.category
            };

            const { data } = await api.post('/products', productData);
            if (data.success) {
                setMessage({ type: 'success', text: 'Product added successfully!' });
                setFormData({ title: '', description: '', price: '', images: '', sizes: 'S,M,L,XL', colors: 'Black,White', stock: '50', category: 'T-Shirts' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to add product' });
        }
    };

    return (
        <div style={{ padding: '3rem 0' }}>
            <div className="container">
                <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

                <div style={{ maxWidth: '800px', background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ marginBottom: '1.5rem' }}>Add New Product</h2>

                    {message && (
                        <div className={`message ${message.type}`} style={{ marginBottom: '1.5rem', padding: '1rem', borderRadius: '0.5rem' }}>
                            {message.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="form-group">
                            <label>Title *</label>
                            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label>Description *</label>
                            <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="form-textarea" />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>Price *</label>
                                <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="form-input" />
                            </div>

                            <div className="form-group">
                                <label>Stock *</label>
                                <input type="number" required value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="form-input" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Category *</label>
                            <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="form-select">
                                <option value="T-Shirts">T-Shirts</option>
                                <option value="Hoodies">Hoodies</option>
                                <option value="Jackets">Jackets</option>
                                <option value="Jeans">Jeans</option>
                                <option value="Shorts">Shorts</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Dresses">Dresses</option>
                                <option value="Sweaters">Sweaters</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Image URLs (comma separated) *</label>
                            <input type="text" required value={formData.images} onChange={(e) => setFormData({ ...formData, images: e.target.value })} className="form-input" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
                        </div>

                        <div className="form-group">
                            <label>Sizes (comma separated)</label>
                            <input type="text" value={formData.sizes} onChange={(e) => setFormData({ ...formData, sizes: e.target.value })} className="form-input" />
                        </div>

                        <div className="form-group">
                            <label>Colors (comma separated)</label>
                            <input type="text" value={formData.colors} onChange={(e) => setFormData({ ...formData, colors: e.target.value })} className="form-input" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg">Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
