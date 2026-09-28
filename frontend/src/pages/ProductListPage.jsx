import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import './ProductListPage.css';

const ProductListPage = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: searchParams.get('category') || '',
        size: searchParams.get('size') || '',
        color: searchParams.get('color') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
        search: searchParams.get('search') || '',
        featured: searchParams.get('featured') || '',
        trending: searchParams.get('trending') || ''
    });

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });

            const { data } = await api.get(`/products?${params.toString()}`);
            setProducts(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="product-list-page">
            <div className="container">
                <div className="page-layout">
                    <aside className="filters-column">
                        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                    </aside>

                    <main className="products-column">
                        <div className="products-header">
                            <h1>All Products</h1>
                            <p className="products-count">{products.length} items found</p>
                        </div>

                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="empty-state">
                                <p>No products found matching your criteria.</p>
                                <button className="btn btn-primary" onClick={() => setFilters({})}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="products-grid">
                                {products.map(product => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;
