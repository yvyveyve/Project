import mockData from '../mockDatabase.js';

// Natural language processing helper
const processMessage = (message) => {
    const lowerMessage = message.toLowerCase();

    // Extract intent and entities
    const intent = {
        type: null,
        entities: {
            category: null,
            color: null,
            priceRange: null,
            size: null,
        },
    };

    // Search/recommendation intent
    if (lowerMessage.includes('show') || lowerMessage.includes('find') ||
        lowerMessage.includes('search') || lowerMessage.includes('looking for')) {
        intent.type = 'search';
    }

    // Navigation intent
    if (lowerMessage.includes('go to') || lowerMessage.includes('take me') ||
        lowerMessage.includes('navigate')) {
        intent.type = 'navigation';
        if (lowerMessage.includes('cart')) {
            intent.navigation = '/cart';
        } else if (lowerMessage.includes('order')) {
            intent.navigation = '/orders';
        } else if (lowerMessage.includes('profile')) {
            intent.navigation = '/profile';
        }
    }

    // Trending/featured intent
    if (lowerMessage.includes('trending') || lowerMessage.includes('popular')) {
        intent.type = 'trending';
    }

    if (lowerMessage.includes('featured') || lowerMessage.includes('new')) {
        intent.type = 'featured';
    }

    // Extract category
    const categories = ['t-shirt', 'hoodie', 'jacket', 'jeans', 'short', 'accessories', 'shoe', 'dress', 'sweater'];
    for (const cat of categories) {
        if (lowerMessage.includes(cat)) {
            intent.entities.category = cat + 's';
            if (cat === 'accessories' || cat === 'jeans') intent.entities.category = cat;
            if (cat === 't-shirt') intent.entities.category = 'T-Shirts';
            if (cat === 'hoodie') intent.entities.category = 'Hoodies';
            if (cat === 'jacket') intent.entities.category = 'Jackets';
            if (cat === 'jeans') intent.entities.category = 'Jeans';
            if (cat === 'short') intent.entities.category = 'Shorts';
            if (cat === 'accessories') intent.entities.category = 'Accessories';
            if (cat === 'shoe') intent.entities.category = 'Shoes';
            if (cat === 'dress') intent.entities.category = 'Dresses';
            if (cat === 'sweater') intent.entities.category = 'Sweaters';
        }
    }

    // Extract color
    const colors = ['black', 'white', 'red', 'blue', 'green', 'yellow', 'pink', 'purple', 'gray', 'brown', 'navy'];
    for (const color of colors) {
        if (lowerMessage.includes(color)) {
            intent.entities.color = color;
        }
    }

    // Extract price
    const priceMatch = lowerMessage.match(/under\s+\$?(\d+)/i) || lowerMessage.match(/below\s+\$?(\d+)/i);
    if (priceMatch) {
        intent.entities.priceRange = { max: parseInt(priceMatch[1]) };
    }

    const aboveMatch = lowerMessage.match(/above\s+\$?(\d+)/i) || lowerMessage.match(/over\s+\$?(\d+)/i);
    if (aboveMatch) {
        intent.entities.priceRange = { min: parseInt(aboveMatch[1]) };
    }

    // Extract size
    const sizes = ['xs', 's', 'm', 'l', 'xl', 'xxl'];
    for (const size of sizes) {
        if (lowerMessage.includes(size)) {
            intent.entities.size = size.toUpperCase();
        }
    }

    return intent;
};

// Generate response
const generateResponse = async (intent, products) => {
    // Navigation
    if (intent.type === 'navigation') {
        return {
            text: `Taking you to ${intent.navigation}...`,
            action: 'navigate',
            path: intent.navigation,
        };
    }

    // Greeting
    if (intent.type === 'greeting') {
        return {
            text: "Hello! I'm here to help you find the perfect clothing items. You can ask me to show you products, navigate to different pages, or find trending items!",
            suggestions: [
                "Show me black hoodies under $50",
                "Find trending items",
                "Go to my cart",
            ],
        };
    }

    // Info intents
    if (intent.type === 'info') {
        switch (intent.info) {
            case 'return':
                return { text: "Our return policy allows returns within 30 days with a receipt. Items must be unworn and in original packaging.", suggestions: [] };
            case 'shippingTime':
                return { text: "Standard shipping takes 3-5 business days within Kenya. Express shipping is available for an additional KSh 500.", suggestions: [] };
            case 'sizeGuide':
                return { text: "You can find the size guide in the footer of each product page under 'Size Guide'. It provides measurements for all categories.", suggestions: [] };
            case 'material':
                return { text: `The ${intent.entities.category} are made from high-quality materials. For example, our hoodies use a cotton‑poly blend for comfort and durability.`, suggestions: [] };
            case 'discounts':
                return { text: "We currently have a 10% discount on all jackets and a buy-one-get-one-50% off on t‑shirts. Use code SAVE10 at checkout.", suggestions: [] };
            case 'hours':
                return { text: "Our store is open Monday to Saturday from 9 am to 8 pm. We're closed on Sundays.", suggestions: [] };
            case 'contact':
                return { text: "You can reach our support team via email at support@ecommerce.com or call +254 700 123 456.", suggestions: [] };
            case 'orderTracking':
                return { text: "To track an order, go to the 'Orders' page and click on the order you want to track. You'll see the latest status there.", suggestions: [] };
            case 'paymentMethods':
                return { text: "We accept M-Pesa, credit/debit cards, and PayPal.", suggestions: [] };
            case 'giftWrap':
                return { text: "Yes, we offer gift wrapping for an additional KSh 200. Just select the option at checkout.", suggestions: [] };
            default:
                return { text: "I'm not sure how to help with that. Could you rephrase?", suggestions: [] };
        }
    }

    if (products.length === 0) {
        return {
            text: "I couldn't find any products matching your request. Try adjusting your search criteria!",
            suggestions: [
                "Show all hoodies",
                "Find t-shirts under $30",
                "Show trending items",
            ],
        };
    }

    let responseText = `I found ${products.length} product${products.length > 1 ? 's' : ''} for you! `;

    if (intent.entities.category) {
        responseText += `Here are our ${intent.entities.category}`;
    }
    if (intent.entities.color) {
        responseText += ` in ${intent.entities.color}`;
    }
    if (intent.entities.priceRange) {
        if (intent.entities.priceRange.max) {
            responseText += ` under $${intent.entities.priceRange.max}`;
        }
        if (intent.entities.priceRange.min) {
            responseText += ` above $${intent.entities.priceRange.min}`;
        }
    }
    responseText += '.';

    return {
        text: responseText,
        products: products.slice(0, 6), // Return max 6 products
        suggestions: [
            "Show more details",
            "Add to cart",
            "Go to my cart",
        ],
    };
};

// @desc    Process chatbot message
// @route   POST /api/chatbot/message
// @access  Public
export const processChat = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required',
            });
        }

        // Greeting check
        const greetings = ['hi', 'hello', 'hey', 'help'];
        if (greetings.some(g => message.toLowerCase().includes(g))) {
            const response = await generateResponse({ type: 'greeting' }, []);
            return res.json({
                success: true,
                data: response,
            });
        }

        // Process message to extract intent
        const intent = processMessage(message);

        // Handle navigation
        if (intent.type === 'navigation') {
            const response = await generateResponse(intent, []);
            return res.json({
                success: true,
                data: response,
            });
        }

        // Build query for products using mockData
        let filteredProducts = mockData.products;
        if (intent.type === 'trending') {
            filteredProducts = filteredProducts.filter(p => p.trending === true);
        } else if (intent.type === 'featured') {
            filteredProducts = filteredProducts.filter(p => p.featured === true);
        }
        if (intent.entities.category) {
            filteredProducts = filteredProducts.filter(p => p.category === intent.entities.category);
        }
        if (intent.entities.color) {
            filteredProducts = filteredProducts.filter(p => p.colors.some(c => c.name.toLowerCase() === intent.entities.color.toLowerCase()));
        }
        if (intent.entities.priceRange) {
            filteredProducts = filteredProducts.filter(p => {
                if (intent.entities.priceRange.min && p.price < intent.entities.priceRange.min) return false;
                if (intent.entities.priceRange.max && p.price > intent.entities.priceRange.max) return false;
                return true;
            });
        }
        if (intent.entities.size) {
            filteredProducts = filteredProducts.filter(p => p.sizes.includes(intent.entities.size));
        }
        const products = filteredProducts.slice(0, 10);

        const response = await generateResponse(intent, products);
        res.json({
            success: true,
            data: response,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing message',
            error: error.message,
        });
    }
};

// @desc    Get chat suggestions
// @route   GET /api/chatbot/suggestions
// @access  Public
export const getSuggestions = async (req, res) => {
    try {
        const suggestions = [
            "Show me black hoodies under $50",
            "Find trending items",
            "Show all t-shirts",
            "Go to my cart",
            "Show featured products",
            "Find blue jeans",
            "Show accessories under $30",
        ];
        res.json({ success: true, data: suggestions });
    } catch (e) {
        res.status(500).json({ success: false, message: 'Error fetching suggestions', error: e.message });
    }
};
