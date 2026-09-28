// Mock in-memory database
const mockData = {
    users: [
        {
            _id: 'user1',
            name: 'Test User',
            email: 'user@test.com',
            password: '$2a$10$rK8qYQE8lYvHxJ5xY5wEfO5zXQKj0YvXQKj0YvXQKj0YvXQKj0YvX', // test123
            role: 'user',
            addresses: [],
            phone: ''
        },
        {
            _id: 'admin1',
            name: 'Admin',
            email: 'admin@ecommerce.com',
            password: '$2a$10$rK8qYQE8lYvHxJ5xY5wEfO5zXQKj0YvXQKj0YvXQKj0YvXQKj0YvX', // admin123
            role: 'admin',
            addresses: [],
            phone: ''
        }
    ],
    products: [
        // Hoodies (6)
        {
            _id: 'prod1',
            title: 'Premium Black Hoodie',
            description: 'Ultra-soft premium cotton blend hoodie with adjustable drawstrings and kangaroo pocket. Perfect for casual wear and layering.',
            price: 4500,
            images: [
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
                'https://images.unsplash.com/photo-1620799140188-3b2a7c2e0e27?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [{ name: 'Black', hex: '#000000' }, { name: 'Charcoal', hex: '#36454F' }],
            stock: 150,
            category: 'Hoodies',
            featured: true,
            trending: true,
            rating: 4.8,
            reviews: 342
        },
        {
            _id: 'prod7',
            title: 'Zip-Up Gray Hoodie',
            description: 'Full-zip hoodie with fleece lining and side pockets. Athletic fit with moisture-wicking fabric.',
            price: 5500,
            images: [
                'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800&q=80',
                'https://images.unsplash.com/photo-1620799140188-3b2a7c2e0e27?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [{ name: 'Heather Gray', hex: '#8C92AC' }, { name: 'Charcoal', hex: '#36454F' }],
            stock: 110,
            category: 'Hoodies',
            featured: false,
            trending: true,
            rating: 4.6,
            reviews: 198
        },
        {
            _id: 'prod21',
            title: 'Oversized Streetwear Hoodie',
            description: 'Trendy oversized hoodie with dropped shoulders and heavy cotton fabric. Street style essential.',
            price: 6500,
            images: [
                'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800&q=80',
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
            ],
            sizes: ['M', 'L', 'XL'],
            colors: [{ name: 'Beige', hex: '#F5F5DC' }, { name: 'Black', hex: '#000000' }],
            stock: 80,
            category: 'Hoodies',
            featured: true,
            trending: false,
            rating: 4.7,
            reviews: 150
        },
        {
            _id: 'prod22',
            title: 'Graphic Print Hoodie',
            description: 'Comfortable hoodie featuring a unique graphic print on the back. Soft fleece interior.',
            price: 5200,
            images: [
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Navy', hex: '#000080' }],
            stock: 60,
            category: 'Hoodies',
            featured: false,
            trending: true,
            rating: 4.5,
            reviews: 90
        },
        {
            _id: 'prod23',
            title: 'Tech Fleece Hoodie',
            description: 'Lightweight tech fleece hoodie designed for warmth without bulk. Modern athletic cut.',
            price: 8500,
            images: [
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
                'https://images.unsplash.com/photo-1620799140188-3b2a7c2e0e27?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [{ name: 'Olive', hex: '#808000' }, { name: 'Black', hex: '#000000' }],
            stock: 40,
            category: 'Hoodies',
            featured: false,
            trending: false,
            rating: 4.8,
            reviews: 110
        },
        {
            _id: 'prod24',
            title: 'Cropped Hoodie',
            description: 'Stylish cropped hoodie for a modern look. Pairs perfectly with high-waisted jeans.',
            price: 3800,
            images: [
                'https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?w=800&q=80',
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
            ],
            sizes: ['XS', 'S', 'M', 'L'],
            colors: [{ name: 'Pink', hex: '#FFC0CB' }, { name: 'Gray', hex: '#808080' }],
            stock: 75,
            category: 'Hoodies',
            featured: true,
            trending: true,
            rating: 4.6,
            reviews: 210
        },

        // T-Shirts (8)
        {
            _id: 'prod2',
            title: 'Classic White Cotton T-Shirt',
            description: 'Essential wardrobe staple made from 100% organic cotton. Breathable, comfortable, and perfect for everyday wear.',
            price: 1500,
            images: [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
                'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80'
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Cream', hex: '#FFFDD0' }],
            stock: 200,
            category: 'T-Shirts',
            featured: true,
            trending: false,
            rating: 4.6,
            reviews: 567
        },
        {
            _id: 'prod10',
            title: 'V-Neck Black T-Shirt',
            description: 'Classic black v-neck tee in soft cotton blend. Versatile wardrobe essential that pairs with everything.',
            price: 1500,
            images: [
                'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80',
                'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            colors: [{ name: 'Black', hex: '#000000' }, { name: 'Charcoal', hex: '#36454F' }],
            stock: 180,
            category: 'T-Shirts',
            featured: false,
            trending: true,
            rating: 4.5,
            reviews: 421
        },
        {
            _id: 'prod14',
            title: 'Striped Long Sleeve Shirt',
            description: 'Casual striped shirt in breathable cotton. Button-down collar with curved hem. Perfect for smart-casual occasions.',
            price: 3500,
            images: [
                'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Navy/White', hex: '#000080' }, { name: 'Black/White', hex: '#000000' }],
            stock: 100,
            category: 'T-Shirts',
            featured: false,
            trending: false,
            rating: 4.2,
            reviews: 156
        },
        {
            _id: 'prod20',
            title: 'Graphic Print T-Shirt',
            description: 'Trendy graphic tee with vintage-inspired print. Made from soft cotton with relaxed fit.',
            price: 2500,
            images: [
                'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
                'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#000000' }, { name: 'Gray', hex: '#808080' }],
            stock: 160,
            category: 'T-Shirts',
            featured: false,
            trending: true,
            rating: 4.3,
            reviews: 334
        },
        {
            _id: 'prod25',
            title: 'Vintage Wash Tee',
            description: 'Soft, vintage-washed t-shirt with a worn-in feel. Relaxed fit for casual comfort.',
            price: 2200,
            images: [
                'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80',
                'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Charcoal', hex: '#36454F' }, { name: 'Olive', hex: '#808000' }],
            stock: 90,
            category: 'T-Shirts',
            featured: true,
            trending: false,
            rating: 4.4,
            reviews: 120
        },
        {
            _id: 'prod26',
            title: 'Pocket Tee',
            description: 'Classic crew neck t-shirt with a functional chest pocket. Durable cotton construction.',
            price: 1800,
            images: [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
                'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Navy', hex: '#000080' }, { name: 'Burgundy', hex: '#800020' }],
            stock: 110,
            category: 'T-Shirts',
            featured: false,
            trending: false,
            rating: 4.5,
            reviews: 85
        },
        {
            _id: 'prod27',
            title: 'Henley Shirt',
            description: 'Long sleeve henley shirt with three-button placket. Waffle knit texture for added warmth.',
            price: 3200,
            images: [
                'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
                'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [{ name: 'Gray', hex: '#808080' }, { name: 'Black', hex: '#000000' }],
            stock: 70,
            category: 'T-Shirts',
            featured: false,
            trending: true,
            rating: 4.6,
            reviews: 140
        },
        {
            _id: 'prod28',
            title: 'Performance Athletic Tee',
            description: 'Moisture-wicking athletic t-shirt designed for workouts. Lightweight and breathable.',
            price: 2800,
            images: [
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
                'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Neon Green', hex: '#39FF14' }, { name: 'Blue', hex: '#0000FF' }],
            stock: 130,
            category: 'T-Shirts',
            featured: false,
            trending: false,
            rating: 4.7,
            reviews: 95
        },

        // Jeans (5)
        {
            _id: 'prod3',
            title: 'Slim Fit Blue Denim Jeans',
            description: 'Modern slim-fit jeans with stretch denim for ultimate comfort. Classic five-pocket styling with premium button and rivets.',
            price: 6500,
            images: [
                'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
                'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80'
            ],
            sizes: ['28', '30', '32', '34', '36', '38'],
            colors: [{ name: 'Classic Blue', hex: '#1E40AF' }, { name: 'Dark Indigo', hex: '#1E3A8A' }],
            stock: 120,
            category: 'Jeans',
            featured: false,
            trending: true,
            rating: 4.5,
            reviews: 289
        },
        {
            _id: 'prod29',
            title: 'Straight Leg Jeans',
            description: 'Timeless straight leg cut. Durable denim that gets better with every wash.',
            price: 5800,
            images: [
                'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80',
                'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'
            ],
            sizes: ['30', '32', '34', '36', '38'],
            colors: [{ name: 'Light Wash', hex: '#ADD8E6' }, { name: 'Medium Wash', hex: '#0000CD' }],
            stock: 100,
            category: 'Jeans',
            featured: true,
            trending: false,
            rating: 4.6,
            reviews: 180
        },
        {
            _id: 'prod30',
            title: 'Black Skinny Jeans',
            description: 'Sleek black skinny jeans with high stretch. Perfect for a sharp, modern silhouette.',
            price: 5500,
            images: [
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80',
                'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'
            ],
            sizes: ['28', '30', '32', '34', '36'],
            colors: [{ name: 'Black', hex: '#000000' }],
            stock: 85,
            category: 'Jeans',
            featured: false,
            trending: true,
            rating: 4.7,
            reviews: 220
        },
        {
            _id: 'prod31',
            title: 'Ripped Denim Jeans',
            description: 'Edgy ripped jeans with distressed details. Relaxed fit for a casual vibe.',
            price: 6200,
            images: [
                'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
                'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80'
            ],
            sizes: ['30', '32', '34', '36'],
            colors: [{ name: 'Light Blue', hex: '#ADD8E6' }],
            stock: 60,
            category: 'Jeans',
            featured: false,
            trending: true,
            rating: 4.4,
            reviews: 130
        },
        {
            _id: 'prod32',
            title: 'Relaxed Fit Carpenter Jeans',
            description: 'Utility-inspired carpenter jeans with hammer loop and extra pockets. Comfortable relaxed fit.',
            price: 5900,
            images: [
                'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80',
                'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80'
            ],
            sizes: ['30', '32', '34', '36', '38'],
            colors: [{ name: 'Tan', hex: '#D2B48C' }, { name: 'Dark Blue', hex: '#00008B' }],
            stock: 50,
            category: 'Jeans',
            featured: false,
            trending: false,
            rating: 4.5,
            reviews: 95
        },

        // Jackets (6)
        {
            _id: 'prod4',
            title: 'Lightweight Windbreaker Jacket',
            description: 'Water-resistant windbreaker with hood. Perfect for outdoor activities and unpredictable weather. Packable design.',
            price: 7500,
            images: [
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
                'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Navy Blue', hex: '#000080' }, { name: 'Forest Green', hex: '#228B22' }, { name: 'Red', hex: '#DC2626' }],
            stock: 85,
            category: 'Jackets',
            featured: true,
            trending: false,
            rating: 4.7,
            reviews: 156
        },
        {
            _id: 'prod11',
            title: 'Distressed Denim Jacket',
            description: 'Vintage-inspired denim jacket with distressed details. Classic trucker style with button closure and chest pockets.',
            price: 8200,
            images: [
                'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80',
                'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Light Wash', hex: '#6CA6CD' }, { name: 'Medium Wash', hex: '#4682B4' }],
            stock: 70,
            category: 'Jackets',
            featured: true,
            trending: true,
            rating: 4.8,
            reviews: 234
        },
        {
            _id: 'prod15',
            title: 'Wool Blend Winter Coat',
            description: 'Elegant wool blend coat with notched lapels and double-breasted buttons. Fully lined for extra warmth.',
            price: 18500,
            images: [
                'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80',
                'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Camel', hex: '#C19A6B' }, { name: 'Charcoal', hex: '#36454F' }, { name: 'Navy', hex: '#000080' }],
            stock: 45,
            category: 'Jackets',
            featured: true,
            trending: true,
            rating: 4.9,
            reviews: 178
        },
        {
            _id: 'prod33',
            title: 'Leather Biker Jacket',
            description: 'Classic leather biker jacket with asymmetrical zip and metal hardware. Adds an edge to any outfit.',
            price: 25000,
            images: [
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
                'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Black', hex: '#000000' }],
            stock: 30,
            category: 'Jackets',
            featured: true,
            trending: true,
            rating: 4.9,
            reviews: 300
        },
        {
            _id: 'prod34',
            title: 'Puffer Jacket',
            description: 'Insulated puffer jacket to keep you warm in the coldest weather. Water-resistant shell.',
            price: 12500,
            images: [
                'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [{ name: 'Red', hex: '#FF0000' }, { name: 'Black', hex: '#000000' }],
            stock: 60,
            category: 'Jackets',
            featured: false,
            trending: true,
            rating: 4.7,
            reviews: 180
        },
        {
            _id: 'prod35',
            title: 'Bomber Jacket',
            description: 'Classic bomber jacket with ribbed collar, cuffs, and hem. Versatile layer for transitional weather.',
            price: 9500,
            images: [
                'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
                'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Olive', hex: '#808000' }, { name: 'Black', hex: '#000000' }],
            stock: 80,
            category: 'Jackets',
            featured: false,
            trending: false,
            rating: 4.6,
            reviews: 140
        },

        // Sweaters (5)
        {
            _id: 'prod5',
            title: 'Cozy Knit Sweater',
            description: 'Soft merino wool blend sweater with ribbed collar and cuffs. Perfect for layering or wearing on its own.',
            price: 5500,
            images: [
                'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Heather Gray', hex: '#8C92AC' }, { name: 'Burgundy', hex: '#800020' }, { name: 'Navy', hex: '#000080' }],
            stock: 95,
            category: 'Sweaters',
            featured: false,
            trending: true,
            rating: 4.4,
            reviews: 203
        },
        {
            _id: 'prod17',
            title: 'Crew Neck Sweatshirt',
            description: 'Comfortable fleece sweatshirt with ribbed cuffs and hem. Perfect for lounging or casual outings.',
            price: 3800,
            images: [
                'https://images.unsplash.com/photo-1620799140188-3b2a7c2e0e27?w=800&q=80',
                'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL', 'XXL'],
            colors: [{ name: 'Gray', hex: '#808080' }, { name: 'Burgundy', hex: '#800020' }, { name: 'Forest Green', hex: '#228B22' }],
            stock: 125,
            category: 'Sweaters',
            featured: false,
            trending: false,
            rating: 4.4,
            reviews: 187
        },
        {
            _id: 'prod36',
            title: 'Cable Knit Cardigan',
            description: 'Classic cable knit cardigan with button front. Adds texture and warmth to any look.',
            price: 6500,
            images: [
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
                'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Cream', hex: '#FFFDD0' }, { name: 'Navy', hex: '#000080' }],
            stock: 65,
            category: 'Sweaters',
            featured: true,
            trending: false,
            rating: 4.7,
            reviews: 160
        },
        {
            _id: 'prod37',
            title: 'Turtleneck Sweater',
            description: 'Sleek turtleneck sweater in soft cotton blend. Perfect for a sophisticated winter look.',
            price: 4800,
            images: [
                'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Black', hex: '#000000' }, { name: 'Camel', hex: '#C19A6B' }],
            stock: 80,
            category: 'Sweaters',
            featured: false,
            trending: true,
            rating: 4.6,
            reviews: 130
        },
        {
            _id: 'prod38',
            title: 'Oversized Knit Pullover',
            description: 'Relaxed fit knit pullover for ultimate comfort. Slouchy silhouette pairs well with leggings.',
            price: 5200,
            images: [
                'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80',
                'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L'],
            colors: [{ name: 'Pink', hex: '#FFC0CB' }, { name: 'Gray', hex: '#808080' }],
            stock: 70,
            category: 'Sweaters',
            featured: false,
            trending: true,
            rating: 4.5,
            reviews: 110
        },

        // Dresses (5)
        {
            _id: 'prod8',
            title: 'Floral Summer Dress',
            description: 'Elegant floral print dress with adjustable straps and flowy silhouette. Perfect for summer occasions and casual outings.',
            price: 6500,
            images: [
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
                'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=800&q=80'
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: [{ name: 'Floral Multi', hex: '#FFC0CB' }, { name: 'Sky Blue', hex: '#87CEEB' }],
            stock: 75,
            category: 'Dresses',
            featured: true,
            trending: false,
            rating: 4.7,
            reviews: 267
        },
        {
            _id: 'prod16',
            title: 'Maxi Flowy Dress',
            description: 'Elegant maxi dress with empire waist and flowing skirt. Perfect for special occasions or beach weddings.',
            price: 8500,
            images: [
                'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80',
                'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=800&q=80'
            ],
            sizes: ['XS', 'S', 'M', 'L', 'XL'],
            colors: [{ name: 'Coral', hex: '#FF7F50' }, { name: 'Sage Green', hex: '#9DC183' }, { name: 'Navy', hex: '#000080' }],
            stock: 65,
            category: 'Dresses',
            featured: false,
            trending: true,
            rating: 4.7,
            reviews: 243
        },
        {
            _id: 'prod39',
            title: 'Little Black Dress',
            description: 'The classic little black dress. Fitted silhouette with a flattering neckline. A wardrobe must-have.',
            price: 7500,
            images: [
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
                'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=800&q=80'
            ],
            sizes: ['XS', 'S', 'M', 'L'],
            colors: [{ name: 'Black', hex: '#000000' }],
            stock: 50,
            category: 'Dresses',
            featured: true,
            trending: true,
            rating: 4.8,
            reviews: 300
        },
        {
            _id: 'prod40',
            title: 'Wrap Dress',
            description: 'Flattering wrap dress with tie waist. Versatile style suitable for work or dinner.',
            price: 6800,
            images: [
                'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=800&q=80',
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Red', hex: '#FF0000' }, { name: 'Navy', hex: '#000080' }],
            stock: 60,
            category: 'Dresses',
            featured: false,
            trending: false,
            rating: 4.6,
            reviews: 150
        },
        {
            _id: 'prod41',
            title: 'Boho Midi Dress',
            description: 'Bohemian style midi dress with puff sleeves and tiered skirt. Relaxed and romantic.',
            price: 7200,
            images: [
                'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80',
                'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?w=800&q=80'
            ],
            sizes: ['XS', 'S', 'M', 'L'],
            colors: [{ name: 'Rust', hex: '#B7410E' }, { name: 'Cream', hex: '#FFFDD0' }],
            stock: 55,
            category: 'Dresses',
            featured: false,
            trending: true,
            rating: 4.5,
            reviews: 120
        },

        // Shorts (5)
        {
            _id: 'prod9',
            title: 'Casual Cargo Shorts',
            description: 'Comfortable cotton cargo shorts with multiple pockets and adjustable waist. Perfect for outdoor activities.',
            price: 3500,
            images: [
                'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
                'https://images.unsplash.com/photo-1624378515195-6bbdb73dff1a?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Khaki', hex: '#C3B091' }, { name: 'Olive', hex: '#808000' }, { name: 'Navy', hex: '#000080' }],
            stock: 130,
            category: 'Shorts',
            featured: false,
            trending: false,
            rating: 4.3,
            reviews: 145
        },
        {
            _id: 'prod12',
            title: 'Running Athletic Shorts',
            description: 'Lightweight moisture-wicking shorts with built-in liner. Perfect for running, gym, or casual wear.',
            price: 2800,
            images: [
                'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
                'https://images.unsplash.com/photo-1598032895397-2a4c37ade1ed?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Black', hex: '#000000' }, { name: 'Navy', hex: '#000080' }, { name: 'Gray', hex: '#808080' }],
            stock: 145,
            category: 'Shorts',
            featured: false,
            trending: true,
            rating: 4.4,
            reviews: 189
        },
        {
            _id: 'prod42',
            title: 'Denim Shorts',
            description: 'Classic denim shorts with rolled cuffs. A summer staple.',
            price: 3200,
            images: [
                'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80',
                'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80'
            ],
            sizes: ['28', '30', '32', '34', '36'],
            colors: [{ name: 'Blue', hex: '#0000FF' }, { name: 'Black', hex: '#000000' }],
            stock: 100,
            category: 'Shorts',
            featured: true,
            trending: false,
            rating: 4.6,
            reviews: 170
        },
        {
            _id: 'prod43',
            title: 'Chino Shorts',
            description: 'Smart casual chino shorts. Soft cotton twill fabric with a tailored fit.',
            price: 3000,
            images: [
                'https://images.unsplash.com/photo-1624378515195-6bbdb73dff1a?w=800&q=80',
                'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'
            ],
            sizes: ['30', '32', '34', '36', '38'],
            colors: [{ name: 'Beige', hex: '#F5F5DC' }, { name: 'Navy', hex: '#000080' }],
            stock: 90,
            category: 'Shorts',
            featured: false,
            trending: false,
            rating: 4.5,
            reviews: 130
        },
        {
            _id: 'prod44',
            title: 'Board Shorts',
            description: 'Quick-drying board shorts for swimming and beach activities. Vibrant prints.',
            price: 2500,
            images: [
                'https://images.unsplash.com/photo-1598032895397-2a4c37ade1ed?w=800&q=80',
                'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Blue Print', hex: '#0000FF' }, { name: 'Red Print', hex: '#FF0000' }],
            stock: 80,
            category: 'Shorts',
            featured: false,
            trending: true,
            rating: 4.4,
            reviews: 100
        },

        // Shoes (5)
        {
            _id: 'prod6',
            title: 'Premium Leather Sneakers',
            description: 'Handcrafted leather sneakers with cushioned insoles and breathable lining. Timeless design meets modern comfort.',
            price: 12500,
            images: [
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
                'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80'
            ],
            sizes: ['7', '8', '9', '10', '11', '12'],
            colors: [{ name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' }, { name: 'Brown', hex: '#8B4513' }],
            stock: 60,
            category: 'Shoes',
            featured: true,
            trending: true,
            rating: 4.9,
            reviews: 412
        },
        {
            _id: 'prod18',
            title: 'High-Top Canvas Sneakers',
            description: 'Classic canvas high-top sneakers with rubber sole. Timeless style for everyday wear.',
            price: 6500,
            images: [
                'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
                'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80'
            ],
            sizes: ['7', '8', '9', '10', '11', '12'],
            colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#000000' }, { name: 'Red', hex: '#DC2626' }],
            stock: 95,
            category: 'Shoes',
            featured: false,
            trending: true,
            rating: 4.5,
            reviews: 298
        },
        {
            _id: 'prod45',
            title: 'Running Shoes',
            description: 'High-performance running shoes with shock absorption and breathable mesh upper.',
            price: 9500,
            images: [
                'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80'
            ],
            sizes: ['7', '8', '9', '10', '11', '12'],
            colors: [{ name: 'Red', hex: '#FF0000' }, { name: 'Blue', hex: '#0000FF' }],
            stock: 70,
            category: 'Shoes',
            featured: true,
            trending: true,
            rating: 4.8,
            reviews: 250
        },
        {
            _id: 'prod46',
            title: 'Chelsea Boots',
            description: 'Sleek suede Chelsea boots with elastic side panels. Perfect for dressing up or down.',
            price: 11500,
            images: [
                'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80',
                'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80'
            ],
            sizes: ['8', '9', '10', '11'],
            colors: [{ name: 'Tan', hex: '#D2B48C' }, { name: 'Black', hex: '#000000' }],
            stock: 40,
            category: 'Shoes',
            featured: false,
            trending: false,
            rating: 4.7,
            reviews: 180
        },
        {
            _id: 'prod47',
            title: 'Slip-On Loafers',
            description: 'Comfortable slip-on loafers for a relaxed yet polished look. Soft suede finish.',
            price: 7800,
            images: [
                'https://images.unsplash.com/photo-1562183241-b937e95585b6?w=800&q=80',
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80'
            ],
            sizes: ['8', '9', '10', '11'],
            colors: [{ name: 'Navy', hex: '#000080' }, { name: 'Gray', hex: '#808080' }],
            stock: 60,
            category: 'Shoes',
            featured: false,
            trending: false,
            rating: 4.5,
            reviews: 120
        },

        // Accessories (5)
        {
            _id: 'prod13',
            title: 'Canvas Backpack',
            description: 'Durable canvas backpack with padded laptop compartment and multiple organizer pockets. Perfect for daily commute or travel.',
            price: 4500,
            images: [
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
                'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80'
            ],
            sizes: ['One Size'],
            colors: [{ name: 'Tan', hex: '#D2B48C' }, { name: 'Army Green', hex: '#4B5320' }, { name: 'Black', hex: '#000000' }],
            stock: 90,
            category: 'Accessories',
            featured: true,
            trending: false,
            rating: 4.6,
            reviews: 312
        },
        {
            _id: 'prod19',
            title: 'Leather Crossbody Bag',
            description: 'Genuine leather crossbody bag with adjustable strap and multiple compartments. Compact yet spacious design.',
            price: 8500,
            images: [
                'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80',
                'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80'
            ],
            sizes: ['One Size'],
            colors: [{ name: 'Brown', hex: '#8B4513' }, { name: 'Black', hex: '#000000' }, { name: 'Tan', hex: '#D2B48C' }],
            stock: 55,
            category: 'Accessories',
            featured: true,
            trending: false,
            rating: 4.8,
            reviews: 221
        },
        {
            _id: 'prod48',
            title: 'Classic Sunglasses',
            description: 'Timeless sunglasses with UV protection. Stylish frames that suit any face shape.',
            price: 2500,
            images: [
                'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
                'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'
            ],
            sizes: ['One Size'],
            colors: [{ name: 'Black', hex: '#000000' }, { name: 'Tortoise', hex: '#8B4513' }],
            stock: 150,
            category: 'Accessories',
            featured: false,
            trending: true,
            rating: 4.5,
            reviews: 200
        },
        {
            _id: 'prod49',
            title: 'Wool Beanie',
            description: 'Warm wool beanie for cold days. Soft knit construction.',
            price: 1500,
            images: [
                'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&q=80',
                'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&q=80'
            ],
            sizes: ['One Size'],
            colors: [{ name: 'Gray', hex: '#808080' }, { name: 'Mustard', hex: '#FFDB58' }],
            stock: 100,
            category: 'Accessories',
            featured: false,
            trending: false,
            rating: 4.4,
            reviews: 90
        },
        {
            _id: 'prod50',
            title: 'Leather Belt',
            description: 'Genuine leather belt with classic buckle. Durable and stylish.',
            price: 3500,
            images: [
                'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80',
                'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80'
            ],
            sizes: ['S', 'M', 'L', 'XL'],
            colors: [{ name: 'Brown', hex: '#8B4513' }, { name: 'Black', hex: '#000000' }],
            stock: 80,
            category: 'Accessories',
            featured: false,
            trending: false,
            rating: 4.6,
            reviews: 110
        }
    ],
    carts: {},
    orders: {},
    orderCounter: 1
};

// Helper to find user by email
const findUserByEmail = (email) => {
    return mockData.users.find(u => u.email === email);
};

// Helper to find user by ID
const findUserById = (id) => {
    return mockData.users.find(u => u._id === id);
};

// Helper to find product by ID
const findProductById = (id) => {
    return mockData.products.find(p => p._id === id);
};

// Helper to generate ID
const generateId = (prefix = 'id') => {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export default mockData;
export { findUserByEmail, findUserById, findProductById, generateId };
