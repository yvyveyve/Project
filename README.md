# Fashion Store - E-Commerce Clothing Application

A modern, full-stack e-commerce platform for clothing with integrated chatbot assistance, complete checkout workflow, and admin management.

![Status](https://img.shields.io/badge/status-ready-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

✨ **User Features**
- Browse products with advanced filtering (category, size, color, price)
- Product detail pages with image galleries
- Shopping cart with quantity management
- Complete checkout process with order tracking
- Order history with status updates (Processing → Shipped → Delivered)
- User authentication and profile management

🤖 **Smart Chatbot**
- Natural language product search
- Product recommendations
- Navigation assistance
- Auto-suggestions

👨‍💼 **Admin Features**
- Product management (add, update, delete)
- Order management and status updates
- Admin dashboard

## Technology Stack

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + bcrypt
- **API**: RESTful

### Frontend
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Vanilla CSS with modern design system
- **HTTP Client**: Axios

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce-site
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Configure environment variables
   # Edit .env file with your MongoDB URI and JWT secret
   
   # Seed the database with sample products
   npm run seed
   
   # Start the backend server
   npm run dev
   ```
   Backend runs on `http://localhost:5000`

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   
   # Start the frontend development server
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## Default Credentials

### Test User Account
- **Email**: user@test.com
- **Password**: test123

### Admin Account
- **Email**: admin@ecommerce.com
- **Password**: admin123

## Project Structure

```
e-commerce-site/
├── backend/
│   ├── controllers/          # Business logic
│   ├── models/              # Database schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Authentication & validation
│   ├── utils/               # Utilities & seed data
│   ├── server.js            # Express server setup
│   └── package.json

│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── context/         # React Context providers
│   │   ├── utils/           # Helper functions
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoints.

## Architecture Overview

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system architecture details.

## Components List

See [COMPONENTS.md](./COMPONENTS.md) for all React components documentation.

## Features in Detail

### Product Browsing
- Grid layout with responsive design
- Filter by category, size, color, and price range
- Search functionality
- Featured and trending product sections

### Shopping Cart
- Add/remove items with size and color selection
- Quantity management
- Real-time price calculations
- Persistent cart (requires login)

### Checkout Process
1. Review cart items
2. Enter delivery address
3. Provide phone number
4. Select payment method (mock)
5. Place order
6. View order confirmation

### Chatbot Features
Example queries:
- "Show me black hoodies under $50"
- "Find trending items"
- "Go to my cart"
- "Show all t-shirts"

### Order Tracking
- View all past orders
- Track order status
- Order details with item breakdown

## Production Deployment

### Backend Deployment
1. Set environment variables for production
2. Update MongoDB URI to production database
3. Deploy to hosting service (Heroku, AWS, DigitalOcean, etc.)

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder to static hosting (Vercel, Netlify, etc.)
3. Update API base URL if needed

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@fashionstore.com or open an issue in the repository.

## Acknowledgments

- Design inspiration from modern e-commerce platforms
- Icons from emoji unicode
- Placeholder images from Unsplash

---

**Built with ❤️ using the MERN Stack**
