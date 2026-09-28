# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

Most endpoints require JWT authentication. Include the token in the `Authorization` header:
```
Authorization: Bearer <your_token_here>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "jwt_token_here"
  }
}
```

### Login User
**POST** `/auth/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "token": "jwt_token_here"
  }
}
```

### Get Current User
**GET** `/auth/me`

Get the authenticated user's profile.

**Headers:** Requires authentication

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "123abc",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

## Product Endpoints

### Get All Products
**GET** `/products`

Retrieve all products with optional filters.

**Query Parameters:**
- `category` (optional): Filter by category
- `size` (optional): Filter by size
- `color` (optional): Filter by color name
- `minPrice` (optional): Minimum price
- `maxPrice` (optional): Maximum price
- `search` (optional): Search term for title/description
- `featured` (optional): true/false
- `trending` (optional): true/false

**Example:**
```
GET /products?category=Hoodies&color=black&maxPrice=50
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "prod123",
      "title": "Classic Black Hoodie",
      "description": "Comfortable hoodie...",
      "price": 45,
      "images": ["url1", "url2"],
      "sizes": ["S", "M", "L", "XL"],
      "colors": [{"name": "Black", "hex": "#000000"}],
      "stock": 50,
      "category": "Hoodies",
      "featured": true,
      "trending": true,
      "rating": 4.5,
      "reviews": 128
    }
  ]
}
```

### Get Single Product
**GET** `/products/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "prod123",
    "title": "Classic Black Hoodie",
    ...
  }
}
```

### Create Product (Admin Only)
**POST** `/products`

**Headers:** Requires admin authentication

**Request Body:**
```json
{
  "title": "New Product",
  "description": "Product description",
  "price": 29.99,
  "images": ["url1"],
  "sizes": ["S", "M", "L"],
  "colors": [{"name": "Blue", "hex": "#0000FF"}],
  "stock": 100,
  "category": "T-Shirts"
}
```

### Update Product (Admin Only)
**PUT** `/products/:id`

**Headers:** Requires admin authentication

### Delete Product (Admin Only)
**DELETE** `/products/:id`

**Headers:** Requires admin authentication

---

## Cart Endpoints

### Get User Cart
**GET** `/cart`

**Headers:** Requires authentication

**Response:**
```json
{
  "success": true,
  "data": {
    "user": "user_id",
    "items": [
      {
        "product": {...},
        "quantity": 2,
        "size": "M",
        "color": {"name": "Black", "hex": "#000000"},
        "price": 45
      }
    ]
  }
}
```

### Add to Cart
**POST** `/cart/add`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "productId": "prod123",
  "quantity": 1,
  "size": "M",
  "color": {"name": "Black", "hex": "#000000"}
}
```

### Update Cart Item
**PUT** `/cart/update`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "productId": "prod123",
  "quantity": 3,
  "size": "M",
  "color": {"name": "Black", "hex": "#000000"}
}
```

### Remove from Cart
**DELETE** `/cart/remove/:productId?size=M&color=Black`

**Headers:** Requires authentication

### Clear Cart
**DELETE** `/cart/clear`

**Headers:** Requires authentication

---

## Order Endpoints

### Create Order
**POST** `/orders`

**Headers:** Requires authentication

**Request Body:**
```json
{
  "items": [
    {
      "product": "prod123",
      "quantity": 2,
      "size": "M",
      "color": {"name": "Black", "hex": "#000000"}
    }
  ],
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "phone": "+1234567890",
  "paymentDetails": {
    "method": "credit_card",
    "cardLast4": "1234",
    "transactionId": "txn_123"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "order123",
    "orderNumber": "ORD-1234567890-ABC",
    "user": "user_id",
    "items": [...],
    "totalAmount": 95.00,
    "status": "Processing",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Get User Orders
**GET** `/orders`

**Headers:** Requires authentication

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

### Get Single Order
**GET** `/orders/:id`

**Headers:** Requires authentication

### Update Order Status (Admin Only)
**PUT** `/orders/:id/status`

**Headers:** Requires admin authentication

**Request Body:**
```json
{
  "status": "Shipped"
}
```

**Valid Statuses:** `Processing`, `Shipped`, `Delivered`, `Cancelled`

### Get All Orders (Admin Only)
**GET** `/orders/admin/all`

**Headers:** Requires admin authentication

---

## Chatbot Endpoints

### Send Message
**POST** `/chatbot/message`

**Request Body:**
```json
{
  "message": "Show me black hoodies under $50"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "I found 3 products for you! Here are our Hoodies in black under $50.",
    "products": [...],
    "suggestions": ["Show more details", "Add to cart", "Go to my cart"],
    "action": null,
    "path": null
  }
}
```

### Get Suggestions
**GET** `/chatbot/suggestions`

**Response:**
```json
{
  "success": true,
  "data": [
    "Show me black hoodies under $50",
    "Find trending items",
    "Show all t-shirts"
  ]
}
```

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

## Rate Limiting

Currently, there is no rate limiting implemented. In production, consider implementing rate limiting to prevent abuse.

## Notes

- All monetary values are in USD
- Timestamps are in ISO 8601 format
- Product stock is automatically updated when orders are placed
- Cart is cleared automatically after successful order creation
