import mockData, { findProductById, generateId } from '../mockDatabase.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
    try {
        const { category, size, color, minPrice, maxPrice, search, featured, trending } = req.query;

        let products = [...mockData.products];

        // Category filter
        if (category) {
            products = products.filter(p => p.category === category);
        }

        // Size filter
        if (size) {
            products = products.filter(p => p.sizes.includes(size));
        }

        // Color filter
        if (color) {
            products = products.filter(p =>
                p.colors.some(c => c.name.toLowerCase().includes(color.toLowerCase()))
            );
        }

        // Price range filter
        if (minPrice) {
            products = products.filter(p => p.price >= Number(minPrice));
        }
        if (maxPrice) {
            products = products.filter(p => p.price <= Number(maxPrice));
        }

        // Featured filter
        if (featured === 'true') {
            products = products.filter(p => p.featured === true);
        }

        // Trending filter
        if (trending === 'true') {
            products = products.filter(p => p.trending === true);
        }

        // Search filter
        if (search) {
            const searchLower = search.toLowerCase();
            products = products.filter(p =>
                p.title.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                p.category.toLowerCase().includes(searchLower)
            );
        }

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching products',
            error: error.message
        });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
    try {
        const product = findProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching product',
            error: error.message
        });
    }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const newProduct = {
            _id: generateId('prod'),
            ...req.body,
            rating: 0,
            reviews: 0
        };

        mockData.products.push(newProduct);

        res.status(201).json({
            success: true,
            data: newProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const index = mockData.products.findIndex(p => p._id === req.params.id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        mockData.products[index] = {
            ...mockData.products[index],
            ...req.body
        };

        res.json({
            success: true,
            data: mockData.products[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const index = mockData.products.findIndex(p => p._id === req.params.id);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        mockData.products.splice(index, 1);

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting product',
            error: error.message
        });
    }
};

// @desc    Get product categories
// @route   GET /api/products/categories/all
// @access  Public
export const getCategories = async (req, res) => {
    try {
        const categories = [...new Set(mockData.products.map(p => p.category))];

        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching categories',
            error: error.message
        });
    }
};
