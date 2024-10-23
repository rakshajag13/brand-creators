# Creator Management Platform

A full-stack application for managing creator-client relationships, product catalogs, and payments.

## 🌟 Features

### Product Management
- Individual product creation and management
- Bulk product upload via CSV
- Product categorization and inventory tracking
- Image management

### Client Management
- Multi-step client onboarding
- Company profile management
- Client-creator relationship management
- Role-based access control

### Creator Portal
- Creator invitation system
- Profile management
- Performance analytics
- Payment processing

### Communication
- Real-time chat system
- File sharing
- Message history
- Presence indicators

### Analytics & Reporting
- Sales impact metrics
- Performance dashboards
- Custom report generation
- Data export capabilities

### Payment Processing
- Secure payment integration
- Automated billing
- Creator payout management
- Transaction history

## 🚀 Technology Stack

### Frontend
- React.js (18.x)
- TypeScript
- Material-UI / Tailwind CSS
- Socket.io-client
- Redux Toolkit

### Backend
- Node.js (18.x)
- Express.js
- TypeScript
- Socket.io
- Bull (for job processing)

### Databases
- PostgreSQL (primary database)
- Redis (caching & session management)

### Infrastructure
- Docker
- Nginx
- AWS (recommended hosting)

## 📋 Prerequisites

- Node.js 18.x or higher
- PostgreSQL 14.x or higher
- Redis 6.x or higher
- Docker & Docker Compose
- Yarn or npm

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/creator-management-platform.git
cd creator-management-platform
```

2. Install dependencies:
```bash
# Install backend dependencies
cd backend
yarn install

# Install frontend dependencies
cd ../frontend
yarn install
```

3. Set up environment variables:
```bash
# Backend environment variables (.env)
cp backend/.env.example backend/.env

# Frontend environment variables (.env)
cp frontend/.env.example frontend/.env
```

4. Start the development environment:
```bash
# Using Docker
docker-compose up -d

# Without Docker
# Terminal 1 - Backend
cd backend
yarn dev

# Terminal 2 - Frontend
cd frontend
yarn dev
```

## 🗄️ Database Setup

1. Create the databases:
```bash
createdb creator_platform_dev
createdb creator_platform_test
```

2. Run migrations:
```bash
cd backend
yarn migrate
```

3. (Optional) Seed sample data:
```bash
yarn seed
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/creator_platform_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
```

#### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:3000
REACT_APP_STRIPE_PUBLIC_KEY=your-stripe-public-key
REACT_APP_WEBSOCKET_URL=ws://localhost:3000
```

## 📁 Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── tests/
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   └── utils/
│   └── package.json
│
├── shared/
│   └── types/
│
└── docker-compose.yml
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
yarn test        # Run all tests
yarn test:watch  # Run tests in watch mode
yarn test:cov    # Generate coverage report
```

### Frontend Tests
```bash
cd frontend
yarn test        # Run all tests
yarn test:watch  # Run tests in watch mode
yarn test:cov    # Generate coverage report
```

## 📝 API Documentation

API documentation is available at:
- Development: http://localhost:3000/api-docs
- Production: https://your-domain.com/api-docs

## 🚀 Deployment

### Using Docker
```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### Manual Deployment
1. Build the frontend:
```bash
cd frontend
yarn build
```

2. Build the backend:
```bash
cd backend
yarn build
```

3. Start the production server:
```bash
yarn start
```

## 🔐 Security

- All API endpoints are secured with JWT authentication
- Password hashing using bcrypt
- Rate limiting on sensitive endpoints
- Input validation using Joi
- SQL injection protection
- XSS protection
- CORS configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 Scripts

### Backend
```json
{
  "dev": "Start development server",
  "build": "Build for production",
  "start": "Start production server",
  "test": "Run tests",
  "migrate": "Run database migrations",
  "seed": "Seed database with sample data",
  "lint": "Run ESLint",
  "format": "Format code with Prettier"
}
```

### Frontend
```json
{
  "dev": "Start development server",
  "build": "Build for production",
  "test": "Run tests",
  "lint": "Run ESLint",
  "format": "Format code with Prettier"
}
```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check PostgreSQL service is running
   - Verify database credentials in .env
   - Ensure database exists

2. **Redis Connection Errors**
   - Check Redis service is running
   - Verify Redis URL in .env

3. **WebSocket Connection Issues**
   - Check WebSocket URL configuration
   - Verify network connectivity
   - Check firewall settings

## 📚 Additional Resources

- [API Documentation](docs/api.md)
- [Database Schema](docs/schema.md)
- [Development Guidelines](docs/guidelines.md)
- [Testing Strategy](docs/testing.md)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👥 Team

- Project Manager: [Name]
- Technical Lead: [Name]
- Frontend Lead: [Name]
- Backend Lead: [Name]
- DevOps Engineer: [Name]

## 📞 Support

For support, email support@your-domain.com or join our Slack channel.