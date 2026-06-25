const mongoose = require('mongoose');

const gamemodeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  icon: { type: String, default: '⚔️' },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gamemode', gamemodeSchema);
