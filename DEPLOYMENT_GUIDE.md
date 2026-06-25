# DGZ-Tiers - Complete Installation & Deployment Guide

## 🖥️ Local Development Setup

### Step 1: Clone Repository

```bash
git clone https://github.com/freedoom122/DGZ-Tiers.git
cd DGZ-Tiers
```

### Step 2: Backend Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
# For local development:
MONGODB_URI=mongodb://localhost:27017/dgz-tiers
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=marcubrsv@gmail.com
```

### Step 3: Frontend Setup

```bash
cd client
npm install
cd ..
```

### Step 4: Start MongoDB

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
```

### Step 5: Run Development Servers

**Terminal 1 - Backend:**
```bash
npm start
# Output: Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# Opens http://localhost:3000 automatically
```

## 🌐 Deployment Options

### Option 1: Deploy on Vercel + MongoDB Atlas (Recommended)

#### Setup MongoDB Atlas

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create a new cluster
4. Get connection string
5. Replace `MONGODB_URI` in your `.env`

#### Deploy Backend (Render or Railway)

**Using Railway:**

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Connect GitHub repository
4. Set environment variables:
   - `MONGODB_URI` (from MongoDB Atlas)
   - `JWT_SECRET` (generate random string)
   - `ADMIN_EMAIL=marcubrsv@gmail.com`
   - `NODE_ENV=production`
5. Deploy

#### Deploy Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Set build command: `cd client && npm run build`
4. Set output directory: `client/build`
5. Add environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.com`
6. Deploy

### Option 2: Deploy on Heroku (Deprecated - Use Railway Instead)

```bash
# Install Heroku CLI
# Go to https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI="your_mongodb_uri"
heroku config:set JWT_SECRET="your_secret"
heroku config:set ADMIN_EMAIL="marcubrsv@gmail.com"

# Deploy
git push heroku main
```

### Option 3: Docker Deployment

#### Create Dockerfile (root)

```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

EXPOSE 5000

CMD ["npm", "start"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'

services:
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/dgz-tiers
      - JWT_SECRET=your_secret_key
      - ADMIN_EMAIL=marcubrsv@gmail.com
    depends_on:
      - mongo

volumes:
  mongo_data:
```

#### Run with Docker

```bash
docker-compose up
```

## 🔑 Environment Variables

### Development

```env
MONGODB_URI=mongodb://localhost:27017/dgz-tiers
JWT_SECRET=dev-secret-key-change-in-production
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=marcubrsv@gmail.com
```

### Production

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dgz-tiers
JWT_SECRET=generate-strong-random-string
PORT=5000
NODE_ENV=production
ADMIN_EMAIL=marcubrsv@gmail.com
```

## ✅ Verification Checklist

- [ ] Backend running on `localhost:5000`
- [ ] Frontend running on `localhost:3000`
- [ ] MongoDB connected successfully
- [ ] Can sign up with email & username
- [ ] Can login with credentials
- [ ] Can access leaderboards
- [ ] Admin can access admin panel (marcubrsv@gmail.com)
- [ ] Can add players and gamemodes
- [ ] Leaderboard auto-sorts by tier

## 🆘 Common Issues

### "MongooseError: Cannot connect to MongoDB"

```bash
# Check MongoDB is running
mongosh  # Connect to local MongoDB

# Or use MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dgz-tiers
```

### "CORS Error: Access-Control-Allow-Origin"

- Make sure backend is running
- Check `proxy` in `client/package.json` points to `http://localhost:5000`
- In production, update API URL in frontend

### "Port 5000 already in use"

```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
PORT=5001
```

### "Cannot find module 'react-router-dom'"

```bash
cd client
npm install react-router-dom
```

## 📊 Testing the API

Use Postman or cURL:

```bash
# Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get players
curl http://localhost:5000/api/players
```

## 🚀 Performance Tips

1. Use MongoDB indexes for faster queries
2. Enable compression middleware
3. Use Redis for caching leaderboards
4. Implement pagination for large datasets
5. Use CDN for static assets

## 📚 Resources

- [Express.js Documentation](https://expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [React Documentation](https://react.dev)
- [Vercel Deployment](https://vercel.com/docs)
- [Railway Deployment](https://railway.app/docs)

---

**Ready to launch? Go to Step 5! 🚀**
