const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

const rankOrder = ['ht1', 'lt1', 'ht2', 'lt2', 'ht3', 'lt3', 'ht4', 'lt4', 'ht5', 'lt5'];

// Get leaderboard for a specific gamemode
router.get('/:gamemode', async (req, res) => {
  try {
    const { gamemode } = req.params;
    const players = await Player.find();
    
    const leaderboard = players
      .map(player => {
        const rank = player.ranks.find(r => r.gamemode.toLowerCase() === gamemode.toLowerCase());
        return {
          ...player._doc,
          currentRank: rank ? rank.rank : 'Unranked',
          rankIndex: rank ? rankOrder.indexOf(rank.rank.toLowerCase()) : rankOrder.length,
        };
      })
      .filter(player => player.currentRank !== 'Unranked')
      .sort((a, b) => a.rankIndex - b.rankIndex);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
