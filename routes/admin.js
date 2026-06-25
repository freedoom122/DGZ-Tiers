const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Player = require('../models/Player');
const User = require('../models/User');

// Get admin stats
router.get('/stats', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const totalPlayers = await Player.countDocuments();
    const totalUsers = await User.countDocuments();
    
    res.json({ totalPlayers, totalUsers });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/players/:id', auth, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
