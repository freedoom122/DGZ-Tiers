# DGZ-Tiers - Minecraft Tier Testing Platform

🎮 A comprehensive web platform for testing and ranking players across multiple Minecraft server gamemodes.

## ⚡ Features

- **🎮 Multiple Gamemodes**: Support for SwordPVP, Crystal PVP, Cart, Axe, and more
- **👤 User Authentication**: Email and username-based login/sign-up
- **🏆 Tier System**: 10-tier ranking system (HT1-LT5)
- **📊 Leaderboards**: Auto-sorted leaderboards per gamemode
- **⚙️ Admin Panel**: Restricted admin access (only marcubrsv@gmail.com)
- **🎨 Minecraft Themed Design**: Beautiful, retro pixel-art UI
- **📱 Responsive Design**: Works on desktop and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas cloud)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/freedoom122/DGZ-Tiers.git
cd DGZ-Tiers

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Create .env file
cp .env.example .env
```

### Configuration

Edit `.env` file with your settings:

```env
MONGODB_URI=mongodb://localhost:27017/dgz-tiers
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
ADMIN_EMAIL=marcubrsv@gmail.com
```

### Running Locally

**Terminal 1 - Backend:**
```bash
npm install
npm start
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
npm start
# Frontend running on http://localhost:3000
```

## 📋 Tier System

| Tier | Name | Description |
|------|------|-------------|
| 🥇 HT1 | High Tier 1 | BEST - Elite Players |
| 🥈 LT1 | Low Tier 1 | Very Good Players |
| 🥉 HT2 | High Tier 2 | Good Players |
| 📊 LT2 | Low Tier 2 | Above Average |
| 📈 HT3 | High Tier 3 | Average |
| 📉 LT3 | Low Tier 3 | Below Average |
| ⭐ HT4 | High Tier 4 | Beginner+ |
| ⭐ LT4 | Low Tier 4 | Beginner |
| 🌟 HT5 | High Tier 5 | Novice+ |
| 🌟 LT5 | Low Tier 5 | Novice (Start) |

## 👨‍💻 Admin Access

**ONLY** the email `marcubrsv@gmail.com` can access the admin panel.

In the admin panel you can:
- ➕ Add new players
- 🎮 Add gamemodes
- 📊 Update player ranks
- 🗑️ Delete players
- 📈 View statistics

## 📁 Project Structure

```
DGZ-Tiers/
├── server.js                 # Express server
├── models/
│   ├── User.js             # User schema
│   ├── Player.js           # Player schema
│   └── Gamemode.js         # Gamemode schema
├── routes/
│   ├── auth.js             # Auth endpoints
│   ├── players.js          # Player endpoints
│   ├── gamemodes.js        # Gamemode endpoints
│   ├── leaderboard.js      # Leaderboard endpoints
│   └── admin.js            # Admin endpoints
├── middleware/
│   └── auth.js             # JWT authentication
└── client/                  # React frontend
    ├── public/
    ├── src/
    │   ├── pages/          # Page components
    │   ├── components/     # UI components
    │   ├── api/            # API calls
    │   └── App.js          # Main app
```

## 🔐 Authentication

- Sign up with **username**, **email**, and **password**
- Login with **email** and **password**
- JWT tokens stored in localStorage
- Auto-admin role for `marcubrsv@gmail.com`

## 🎮 Gamemodes

Default gamemodes (can be added via admin panel):
- ⚔️ SwordPVP
- 🔮 Crystal PVP
- 🛒 Cart
- 🪓 Axe
- And more!

## 📊 Leaderboard Features

- Auto-sorted by tier (HT1 → LT5)
- Color-coded tier display
- Total ranked players count
- Real-time updates

## 🛠️ Tech Stack

**Backend:**
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- CSS Grid & Flexbox
- React Icons
- Minecraft themed fonts

## 🎨 Design

- **Pixel Art Font**: Press Start 2P (retro Minecraft style)
- **Color Scheme**: Dark theme with Minecraft green (#4CAF50)
- **Glowing Effects**: Neon green text shadows
- **Responsive Grid**: Mobile-friendly layout

## 🚀 Deployment

### Deploy Backend (Heroku)

```bash
heroku create your-app-name
git push heroku main
```

### Deploy Frontend (Vercel)

```bash
cd client
vercel
```

## 📝 API Endpoints

### Auth
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Login

### Players
- `GET /api/players` - Get all players
- `POST /api/players` - Add player (admin)
- `PUT /api/players/:id` - Update player rank (admin)

### Gamemodes
- `GET /api/gamemodes` - Get all gamemodes
- `POST /api/gamemodes` - Add gamemode (admin)

### Leaderboard
- `GET /api/leaderboard/:gamemode` - Get leaderboard for gamemode

### Admin
- `GET /api/admin/stats` - Get stats (admin)
- `DELETE /api/admin/players/:id` - Delete player (admin)

## 🐛 Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or use MongoDB Atlas
- Check `MONGODB_URI` in `.env`

**CORS Error:**
- Make sure backend is running on `http://localhost:5000`
- Check frontend proxy in `client/package.json`

**Port Already in Use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

## 📞 Support

For issues or feature requests, open an issue on GitHub.

## 📄 License

MIT License - Feel free to use this project!

---

**Made with ❤️ for Minecraft players**
