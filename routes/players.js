const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const auth = require('../middleware/auth');

// Get all players
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ createdAt: -1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add player (Admin only)
router.post('/', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { username, email, ranks } = req.body;
    const player = new Player({ username, email, ranks, addedBy: req.user.id });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update player rank
router.put('/:id', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { gamemode, rank } = req.body;
    const player = await Player.findById(req.params.id);
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    const existingRank = player.ranks.find(r => r.gamemode === gamemode);
    if (existingRank) {
      existingRank.rank = rank;
      existingRank.updatedAt = Date.now();
    } else {
      player.ranks.push({ gamemode, rank });
    }

    await player.save();
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
