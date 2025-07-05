# E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js, Express.js, MongoDB, and Prisma.

## 🚀 Features

### Frontend (Next.js)
- **Modern UI** with shadcn/ui components and Tailwind CSS
- **Responsive design** that works on all devices
- **Product catalog** with advanced filtering and search
- **Shopping cart** with persistent storage
- **User authentication** and account management
- **Wishlist functionality**
- **Product reviews and ratings**
- **Newsletter subscription**
- **SEO optimized** pages

### Backend (Express.js + MongoDB + Prisma)
- **RESTful API** with comprehensive endpoints
- **MongoDB database** with Prisma ORM
- **JWT authentication** with secure password hashing
- **Rate limiting** and security middlewares
- **Input validation** and error handling
- **Order management** system
- **Coupon system** for discounts
- **Admin functionality** ready

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: MongoDB with Prisma ORM
- **Authentication**: JWT tokens with bcrypt
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- MongoDB database (local or cloud)
- npm or yarn

### Backend Setup

1. **Navigate to server directory**:
   \`\`\`bash
   cd server
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment setup**:
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update `.env` with your MongoDB connection string and JWT secret:
   \`\`\`env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ecommerce"
   JWT_SECRET="your-super-secret-jwt-key"
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   \`\`\`

4. **Database setup**:
   \`\`\`bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   \`\`\`

5. **Start the server**:
   \`\`\`bash
   npm run dev
   \`\`\`

### Frontend Setup

1. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Environment setup**:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`
   
   Update `.env.local`:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   \`\`\`

3. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

## 🔐 Demo Accounts

After seeding the database, you can use these demo accounts:

- **Admin**: admin@ecomstore.com / admin123
- **User**: test@example.com / test123

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Product Endpoints
- `GET /api/products` - Get products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/categories` - Get all categories

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:itemId` - Update cart item
- `DELETE /api/cart/remove/:itemId` - Remove from cart

### Order Endpoints
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders

### Wishlist Endpoints
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/add` - Add to wishlist
- `DELETE /api/wishlist/remove/:productId` - Remove from wishlist

## 🎯 Available Coupons

- **SAVE10** - 10% off orders over $50
- **WELCOME20** - $20 off orders over $100

## 🚀 Deployment

### Backend Deployment
1. Deploy to platforms like Railway, Render, or DigitalOcean
2. Set environment variables in your hosting platform
3. Ensure MongoDB connection string is accessible

### Frontend Deployment
1. Deploy to Vercel, Netlify, or similar platforms
2. Set `NEXT_PUBLIC_API_URL` to your backend URL
3. Build and deploy

## 🔧 Development

### Adding New Features
1. **Database changes**: Update `prisma/schema.prisma` and run `npx prisma db push`
2. **API endpoints**: Add routes in `server/server.js`
3. **Frontend components**: Create components in `components/` directory
4. **API integration**: Update `lib/api.ts` with new endpoints

### Code Structure
\`\`\`
├── components/          # Reusable UI components
├── app/                # Next.js app router pages
├── lib/                # Utility functions and API client
├── hooks/              # Custom React hooks
├── server/             # Express.js backend
├── prisma/             # Database schema and migrations
└── public/             # Static assets
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
