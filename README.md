# DGZ-Tiers - Minecraft Tier Testing Platform

A comprehensive web platform for testing and ranking players across multiple Minecraft server gamemodes.

## Features

- 🎮 **Multiple Gamemodes**: Support for SwordPVP, Crystal PVP, Cart, Axe, and more
- 👤 **User Authentication**: Email and username-based login/sign-up
- 🏆 **Tier System**: 10-tier ranking system (HT1-LT5)
- 📊 **Leaderboards**: Auto-sorted leaderboards per gamemode
- ⚙️ **Admin Panel**: Restricted admin access for managing players and ranks
- 🎨 **Minecraft Themed Design**: Beautiful, immersive UI

## Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
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

# Update .env with your MongoDB URI and JWT Secret
```

### Running

```bash
# Start backend
npm start

# In another terminal, start frontend
npm run client
```

## Admin Access

Only the email `marcubrsv@gmail.com` can access the admin panel.

## Tier System

- **HT1**: High Tier 1 (Best)
- **LT1**: Low Tier 1
- **HT2**: High Tier 2
- **LT2**: Low Tier 2
- **HT3**: High Tier 3
- **LT3**: Low Tier 3
- **HT4**: High Tier 4
- **LT4**: Low Tier 4
- **HT5**: High Tier 5
- **LT5**: Low Tier 5 (Beginner)
