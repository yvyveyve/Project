import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';

dotenv.config();

const products = [
    {
        title: "Classic Black Hoodie",
        description: "Comfortable and stylish black hoodie made from premium cotton blend. Perfect for casual wear.",
        price: 45,
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"],
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Black", hex: "#000000" }],
        stock: 50,
        category: "Hoodies",
        featured: true,
        trending: true,
        rating: 4.5,
        reviews: 128
    },
    {
        title: "White Cotton T-Shirt",
        description: "Essential white t-shirt made from 100% organic cotton. Soft, breathable, and versatile.",
        price: 20,
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [{ name: "White", hex: "#FFFFFF" }],
        stock: 100,
        category: "T-Shirts",
        featured: true,
        rating: 4.7,
        reviews: 256
    },
    {
        title: "Blue Denim Jeans",
        description: "Classic fit blue jeans with a modern touch. Durable denim that gets better with age.",
        price: 65,
        images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Blue", hex: "#1E3A8A" }],
        stock: 40,
        category: "Jeans",
        trending: true,
        rating: 4.3,
        reviews: 89
    },
    {
        title: "Red Sports Jacket",
        description: "Lightweight sports jacket perfect for outdoor activities. Water-resistant with side pockets.",
        price: 85,
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
        sizes: ["M", "L", "XL"],
        colors: [{ name: "Red", hex: "#DC2626" }],
        stock: 30,
        category: "Jackets",
        featured: true,
        rating: 4.6,
        reviews: 74
    },
    {
        title: "Gray Pullover Sweater",
        description: "Cozy pullover sweater made from soft merino wool. Perfect for cold weather.",
        price: 55,
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"],
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Gray", hex: "#6B7280" }],
        stock: 45,
        category: "Sweaters",
        rating: 4.4,
        reviews: 102
    },
    {
        title: "Black Leather Shoes",
        description: "Premium leather shoes with cushioned insoles. Professional look with all-day comfort.",
        price: 95,
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"],
        sizes: ["M", "L", "XL"],
        colors: [{ name: "Black", hex: "#000000" }],
        stock: 25,
        category: "Shoes",
        featured: true,
        trending: true,
        rating: 4.8,
        reviews: 167
    },
    {
        title: "Navy Blue Hoodie",
        description: "Premium navy hoodie with fleece lining. Warm and comfortable for everyday wear.",
        price: 48,
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: [{ name: "Navy", hex: "#1E3A8A" }],
        stock: 60,
        category: "Hoodies",
        trending: true,
        rating: 4.5,
        reviews: 143
    },
    {
        title: "Striped Cotton Dress",
        description: "Beautiful striped dress perfect for summer. Light, breezy, and elegant.",
        price: 70,
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "White", hex: "#FFFFFF" }, { name: "Black", hex: "#000000" }],
        stock: 35,
        category: "Dresses",
        featured: true,
        rating: 4.7,
        reviews: 91
    },
    {
        title: "Khaki Cargo Shorts",
        description: "Comfortable cargo shorts with multiple pockets. Perfect for outdoor activities.",
        price: 35,
        images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500"],
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Khaki", hex: "#C19A6B" }],
        stock: 55,
        category: "Shorts",
        rating: 4.2,
        reviews: 67
    },
    {
        title: "Classic Black T-Shirt",
        description: "Essential black t-shirt that goes with everything. Premium cotton for ultimate comfort.",
        price: 22,
        images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [{ name: "Black", hex: "#000000" }],
        stock: 120,
        category: "T-Shirts",
        trending: true,
        rating: 4.6,
        reviews: 289
    },
    {
        title: "Brown Leather Jacket",
        description: "Genuine leather jacket with classic biker style. Timeless piece for your wardrobe.",
        price: 180,
        images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"],
        sizes: ["M", "L", "XL"],
        colors: [{ name: "Brown", hex: "#92400E" }],
        stock: 15,
        category: "Jackets",
        featured: true,
        rating: 4.9,
        reviews: 54
    },
    {
        title: "White Sneakers",
        description: "Clean white sneakers perfect for any casual outfit. Comfortable and stylish.",
        price: 75,
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"],
        sizes: ["M", "L", "XL"],
        colors: [{ name: "White", hex: "#FFFFFF" }],
        stock: 40,
        category: "Shoes",
        trending: true,
        rating: 4.5,
        reviews: 134
    },
    {
        title: "Beanie Hat",
        description: "Warm knitted beanie for cold weather. One size fits all.",
        price: 18,
        images: ["https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500"],
        sizes: ["M"],
        colors: [{ name: "Black", hex: "#000000" }, { name: "Gray", hex: "#6B7280" }],
        stock: 80,
        category: "Accessories",
        rating: 4.3,
        reviews: 45
    },
    {
        title: "Sunglasses - Classic Aviator",
        description: "Timeless aviator sunglasses with UV protection. Polarized lenses.",
        price: 42,
        images: ["https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"],
        sizes: ["M"],
        colors: [{ name: "Gold", hex: "#D4AF37" }],
        stock: 50,
        category: "Accessories",
        featured: true,
        rating: 4.7,
        reviews: 98
    },
    {
        title: "Pink Casual Hoodie",
        description: "Comfortable pink hoodie with kangaroo pocket. Soft fleece interior.",
        price: 42,
        images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500"],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Pink", hex: "#EC4899" }],
        stock: 40,
        category: "Hoodies",
        rating: 4.4,
        reviews: 76
    },
    {
        title: "Green V-Neck Sweater",
        description: "Elegant v-neck sweater in forest green. Perfect for layering.",
        price: 52,
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"],
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Green", hex: "#059669" }],
        stock: 35,
        category: "Sweaters",
        trending: true,
        rating: 4.6,
        reviews: 83
    },
    {
        title: "Black Skinny Jeans",
        description: "Modern fit black jeans with stretch fabric for comfort and flexibility.",
        price: 58,
        images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=500"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [{ name: "Black", hex: "#000000" }],
        stock: 70,
        category: "Jeans",
        featured: true,
        rating: 4.5,
        reviews: 156
    },
    {
        title: "Yellow Summer Dress",
        description: "Bright yellow dress perfect for sunny days. Flowy and comfortable.",
        price: 68,
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Yellow", hex: "#FCD34D" }],
        stock: 28,
        category: "Dresses",
        trending: true,
        rating: 4.8,
        reviews: 62
    },
    {
        title: "Blue Denim Shorts",
        description: "Classic denim shorts for summer. Comfortable fit with distressed details.",
        price: 38,
        images: ["https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [{ name: "Blue", hex: "#3B82F6" }],
        stock: 52,
        category: "Shorts",
        rating: 4.3,
        reviews: 94
    },
    {
        title: "Purple Athletic T-Shirt",
        description: "Moisture-wicking athletic t-shirt. Perfect for workouts and sports.",
        price: 28,
        images: ["https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500"],
        sizes: ["S", "M", "L", "XL"],
        colors: [{ name: "Purple", hex: "#9333EA" }],
        stock: 65,
        category: "T-Shirts",
        rating: 4.4,
        reviews: 117
    }
];

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Product.deleteMany();
        console.log('🗑️  Cleared existing products');

        // Insert products
        await Product.insertMany(products);
        console.log(`✅ Inserted ${products.length} products`);

        // Create admin user if doesn't exist
        const adminExists = await User.findOne({ email: 'admin@ecommerce.com' });
        if (!adminExists) {
            await User.create({
                name: 'Admin',
                email: 'admin@ecommerce.com',
                password: 'admin123',
                role: 'admin'
            });
            console.log('✅ Created admin user (email: admin@ecommerce.com, password: admin123)');
        }

        // Create test user if doesn't exist
        const userExists = await User.findOne({ email: 'user@test.com' });
        if (!userExists) {
            await User.create({
                name: 'Test User',
                email: 'user@test.com',
                password: 'test123',
                role: 'user'
            });
            console.log('✅ Created test user (email: user@test.com, password: test123)');
        }

        console.log('🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
