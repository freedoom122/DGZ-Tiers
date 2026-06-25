const express = require('express');
const router = express.Router();
const Gamemode = require('../models/Gamemode');
const auth = require('../middleware/auth');

// Get all gamemodes
router.get('/', async (req, res) => {
  try {
    const gamemodes = await Gamemode.find();
    res.json(gamemodes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add gamemode (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, icon, description } = req.body;
    const gamemode = new Gamemode({ name, icon, description });
    await gamemode.save();
    res.status(201).json(gamemode);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
