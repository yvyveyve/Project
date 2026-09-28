import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange }) => {
    const categories = ['T-Shirts', 'Hoodies', 'Jackets', 'Jeans', 'Shorts', 'Accessories', 'Shoes', 'Dresses', 'Sweaters'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const colors = [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Red', hex: '#DC2626' },
        { name: 'Blue', hex: '#3B82F6' },
        { name: 'Green', hex: '#059669' },
        { name: 'Yellow', hex: '#FCD34D' },
        { name: 'Pink', hex: '#EC4899' },
        { name: 'Purple', hex: '#9333EA' },
        { name: 'Gray', hex: '#6B7280' }
    ];

    return (
        <div className="filter-sidebar">
            <h3>Filters</h3>

            <div className="filter-section">
                <h4>Category</h4>
                {categories.map(cat => (
                    <label key={cat} className="filter-option">
                        <input
                            type="radio"
                            name="category"
                            value={cat}
                            checked={filters.category === cat}
                            onChange={(e) => onFilterChange('category', e.target.value)}
                        />
                        <span>{cat}</span>
                    </label>
                ))}
                {filters.category && (
                    <button className="clear-filter" onClick={() => onFilterChange('category', '')}>
                        Clear
                    </button>
                )}
            </div>

            <div className="filter-section">
                <h4>Size</h4>
                <div className="size-grid">
                    {sizes.map(size => (
                        <button
                            key={size}
                            className={`size-btn ${filters.size === size ? 'active' : ''}`}
                            onClick={() => onFilterChange('size', filters.size === size ? '' : size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h4>Color</h4>
                <div className="color-grid">
                    {colors.map(color => (
                        <button
                            key={color.name}
                            className={`color-btn ${filters.color === color.name ? 'active' : ''}`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => onFilterChange('color', filters.color === color.name ? '' : color.name)}
                            title={color.name}
                        >
                            {filters.color === color.name && '✓'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="filter-section">
                <h4>Price Range (KSh)</h4>
                <div className="price-inputs">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice || ''}
                        onChange={(e) => onFilterChange('minPrice', e.target.value)}
                        className="price-input"
                    />
                    <span>-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice || ''}
                        onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                        className="price-input"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
