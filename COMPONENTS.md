# Components Documentation

Complete list of all React components and pages in the application.

## Core Application

### `App.jsx`
**Purpose**: Main application component with routing configuration

**Features**:
- React Router setup
- Route definitions for all pages
- Protected route wrappers for authenticated pages
- Admin-only route protection

**Routes**:
- `/` - HomePage
- `/products` - ProductListPage
- `/products/:id` - ProductDetailPage
- `/cart` - CartPage (protected)
- `/checkout` - CheckoutPage (protected)
- `/order-confirmation/:orderId` - OrderConfirmationPage (protected)
- `/orders` - OrderHistoryPage (protected)
- `/profile` - ProfilePage (protected)
- `/admin` - AdminPage (admin only)
- `/login` - LoginPage
- `/signup` - SignupPage

---

## Components

### `Navbar.jsx`
**Location**: `/src/components/Navbar.jsx`

**Purpose**: Main navigation bar displayed across all pages

**Features**:
- Logo and brand name
- Search bar with submit functionality
- Cart icon with item count badge
- User menu dropdown
- Login/Signup buttons (when not authenticated)
- Responsive mobile layout

**Props**: None (uses Context)

**State**:
- `searchQuery` - Current search input
- `showUserMenu` - Toggle for user dropdown

---

### `ProductCard.jsx`
**Location**: `/src/components/ProductCard.jsx`

**Purpose**: Reusable card component for displaying product summaries

**Features**:
- Product image with hover effect
- Title, category, price
- Rating and review count
- Featured/Trending badges
- Click to navigate to product detail

**Props**:
```jsx
{
  product: {
    _id: string,
    title: string,
    images: string[],
    price: number,
    category: string,
    rating: number,
    reviews: number,
    featured: boolean,
    trending: boolean
  }
}
```

---

### `FilterSidebar.jsx`
**Location**: `/src/components/FilterSidebar.jsx`

**Purpose**: Filter controls for product listing page

**Features**:
- Category radio buttons
- Size button grid
- Color selector with visual swatches
- Price range inputs (min/max)
- Clear filter buttons

**Props**:
```jsx
{
  filters: {
    category: string,
    size: string,
    color: string,
    minPrice: string,
    maxPrice: string
  },
  onFilterChange: (key: string, value: string) => void
}
```

---

### `Chatbot.jsx`
**Location**: `/src/components/Chatbot.jsx`

**Purpose**: Floating chatbot widget for customer assistance

**Features**:
- Toggle button when closed
- Floating chat window when open
- Message history display
- Product cards in messages
- Suggestion chips
- Auto-scroll to latest message
- Loading indicator (typing animation)
- Navigation command handling

**Props**: None (uses ChatbotContext)

**State**:
- `input` - Current message input

---

### `ProtectedRoute.jsx`
**Location**: `/src/components/ProtectedRoute.jsx`

**Purpose**: Wrapper component for protected routes

**Features**:
- Authentication check
- Admin role check
- Loading state handling
- Redirect to login if not authenticated
- Redirect to home if not admin (for admin routes)

**Props**:
```jsx
{
  children: ReactNode,
  adminOnly: boolean (default: false)
}
```

---

## Pages

### `HomePage.jsx`
**Location**: `/src/pages/HomePage.jsx`

**Purpose**: Landing page with hero section and product showcases

**Sections**:
1. **Hero Section**: Main banner with CTA buttons
2. **Categories**: Grid of category cards with icons
3. **Featured Products**: Showcase of featured items
4. **Trending Products**: Showcase of trending items

**State**:
- `featuredProducts` - Array of featured products
- `trendingProducts` - Array of trending products
- `loading` - Loading state

---

### `ProductListPage.jsx`
**Location**: `/src/pages/ProductListPage.jsx`

**Purpose**: Product browsing page with filtering

**Features**:
- Filter sidebar
- Product grid display
- URL parameter syncing
- Product count display
- Empty state handling
- Loading state

**State**:
- `products` - Array of products
- `loading` - Loading state
- `filters` - Current filter values

---

### `ProductDetailPage.jsx`
**Location**: `/src/pages/ProductDetailPage.jsx`

**Purpose**: Detailed view of a single product

**Features**:
- Image gallery with thumbnails
- Product title, price, description
- Rating and reviews
- Size selector
- Color selector
- Quantity controls
- Stock information
- Add to cart button
- Success/error messages

**State**:
- `product` - Product data
- `selectedImage` - Currently displayed image index
- `selectedSize` - Selected size
- `selectedColor` - Selected color object
- `quantity` - Quantity to add
- `message` - Success/error message
- `loading` - Loading state

---

### `CartPage.jsx`
**Location**: `/src/pages/CartPage.jsx`

**Purpose**: Shopping cart management

**Features**:
- Cart item list with images
- Quantity controls (+/-)
- Remove item button
- Order summary sidebar
- Subtotal, shipping, total calculations
- Free shipping indicator ($50+)
- Checkout button
- Empty cart state

**State**: Uses CartContext

---

### `CheckoutPage.jsx`
**Location**: `/src/pages/CheckoutPage.jsx`

**Purpose**: Order checkout form

**Features**:
- Delivery address form (street, city, state, zip, country)
- Phone number input
- Payment method selector
- Mock card number input
- Order summary sidebar
- Form validation
- Order placement

**State**:
- `formData` - All form fields
- `loading` - Submission state

---

### `OrderConfirmationPage.jsx`
**Location**: `/src/pages/OrderConfirmationPage.jsx`

**Purpose**: Order success confirmation

**Features**:
- Success checkmark
- Order number display
- Order details summary
- Delivery address confirmation
- Quick action buttons (View Orders, Continue Shopping)

**State**:
- `order` - Order data
- `loading` - Loading state

---

### `OrderHistoryPage.jsx`
**Location**: `/src/pages/OrderHistoryPage.jsx`

**Purpose**: User's past orders list

**Features**:
- Order cards with key information
- Order number and date
- Status badge (Processing/Shipped/Delivered)
- Total amount
- Item list preview
- Empty state for no orders

**State**:
- `orders` - Array of orders
- `loading` - Loading state

---

### `LoginPage.jsx`
**Location**: `/src/pages/LoginPage.jsx`

**Purpose**: User authentication

**Features**:
- Email and password inputs
- Form validation
- Error message display
- Link to signup page
- Test credentials display

**State**:
- `formData` - Email and password
- `error` - Error message
- `loading` - Submission state

---

### `SignupPage.jsx`
**Location**: `/src/pages/SignupPage.jsx`

**Purpose**: New user registration

**Features**:
- Name, email, password inputs
- Form validation
- Error message display
- Link to login page
- Minimum password length (6 characters)

**State**:
- `formData` - Name, email, password
- `error` - Error message
- `loading` - Submission state

---

### `ProfilePage.jsx`
**Location**: `/src/pages/ProfilePage.jsx`

**Purpose**: User account management

**Features**:
- Display user information (name, email, role)
- Quick links to orders and products
- Admin dashboard link (if admin)
- Logout button

**State**: Uses AuthContext

---

### `AdminPage.jsx`
**Location**: `/src/pages/AdminPage.jsx`

**Purpose**: Product management dashboard (admin only)

**Features**:
- Add new product form
- Title, description, price inputs
- Stock management
- Category selector
- Image URL inputs (comma-separated)
- Size and color inputs
- Success/error messages

**State**:
- `formData` - All product fields
- `message` - Success/error message

---

## Context Providers

### `AuthContext.jsx`
**Location**: `/src/context/AuthContext.jsx`

**Purpose**: Global authentication state management

**Provided Values**:
```jsx
{
  user: Object | null,
  loading: boolean,
  login: (email, password) => Promise,
  register: (name, email, password) => Promise,
  logout: () => void,
  isAuthenticated: boolean,
  isAdmin: boolean
}
```

**Features**:
- User state persistence (localStorage)
- JWT token management
- Login/register/logout functions
- Authentication status checks

---

### `CartContext.jsx`
**Location**: `/src/context/CartContext.jsx`

**Purpose**: Global shopping cart state management

**Provided Values**:
```jsx
{
  cart: Object,
  loading: boolean,
  addToCart: (productId, quantity, size, color) => Promise,
  updateCartItem: (productId, quantity, size, color) => Promise,
  removeFromCart: (productId, size, color) => Promise,
  clearCart: () => Promise,
  fetchCart: () => Promise,
  cartTotal: number,
  cartItemCount: number
}
```

**Features**:
- Cart data fetching and caching
- Add/update/remove operations
- Total price calculation
- Item count calculation

---

### `ChatbotContext.jsx`
**Location**: `/src/context/ChatbotContext.jsx`

**Purpose**: Chatbot interface state management

**Provided Values**:
```jsx
{
  isOpen: boolean,
  messages: Array,
  loading: boolean,
  sendMessage: (text) => Promise,
  toggleChat: () => void,
  closeChat: () => void,
  openChat: () => void
}
```

**Features**:
- Chat window state (open/closed)
- Message history
- Send message functionality
- Welcome message on initialization

---

## Utilities

### `api.js`
**Location**: `/src/utils/api.js`

**Purpose**: Axios instance with interceptors

**Features**:
- Base URL configuration
- Request interceptor (adds JWT token)
- Response interceptor (handles 401 errors)
- Automatic redirect to login on authentication failure

---

## Styling

### `index.css`
**Location**: `/src/index.css`

**Purpose**: Global styles and design system

**Features**:
- CSS variables for colors, spacing, typography
- Utility classes (flex, grid, text, spacing)
- Component styles (buttons, cards, forms)
- Animations and transitions
- Responsive breakpoints
- Modern design patterns (gradients, glassmorphism)

**Component-Specific CSS**:
- `Navbar.css`
- `ProductCard.css`
- `FilterSidebar.css`
- `Chatbot.css`
- `HomePage.css`
- `ProductListPage.css`
- `ProductDetailPage.css`
- `CartPage.css`
- `CheckoutPage.css`
- `AuthPages.css`

---

## Component Usage Examples

### Using ProductCard
```jsx
import ProductCard from './components/ProductCard';

<div className="products-grid">
  {products.map(product => (
    <ProductCard key={product._id} product={product} />
  ))}
</div>
```

### Using FilterSidebar
```jsx
import FilterSidebar from './components/FilterSidebar';

const [filters, setFilters] = useState({});

const handleFilterChange = (key, value) => {
  setFilters(prev => ({ ...prev, [key]: value }));
};

<FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
```

### Using Protected Routes
```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route 
  path="/admin" 
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminPage />
    </ProtectedRoute>
  } 
/>
```

### Using Contexts
```jsx
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { useChatbot } from './context/ChatbotContext';

function MyComponent() {
  const { user, logout } = useAuth();
  const { cartItemCount, addToCart } = useCart();
  const { openChat } = useChatbot();
  
  // Use context values...
}
```

---

## Component Best Practices

1. **Reusability**: Components like ProductCard are designed to be reused across multiple pages
2. **Props Validation**: Components expect specific prop shapes (documented above)
3. **Error Handling**: All API calls include try-catch blocks
4. **Loading States**: Components show loading spinners during data fetching
5. **Responsive Design**: All components are mobile-friendly
6. **Accessibility**: Semantic HTML and proper ARIA labels (can be improved)
7. **Performance**: Components avoid unnecessary re-renders
8. **State Management**: Global state in Context, local state in components

---

**Total Components**: 14 components + 10 pages + 3 context providers = 27 total modules
