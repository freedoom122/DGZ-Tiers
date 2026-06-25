import React, { useEffect, useState } from 'react';
import { getPlayers, addPlayer, updatePlayerRank, deletePlayer, getGamemodes } from '../api/api';
import './AdminPanel.css';
import { FaTrash, FaPlusCircle } from 'react-icons/fa';

const AdminPanel = () => {
  const [players, setPlayers] = useState([]);
  const [gamemodes, setGamemodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ username: '', email: '', gamemode: '', rank: '' });
  const [editingId, setEditingId] = useState(null);
  const [editRank, setEditRank] = useState('');
  const [editGamemode, setEditGamemode] = useState('');

  const rankOrder = ['ht1', 'lt1', 'ht2', 'lt2', 'ht3', 'lt3', 'ht4', 'lt4', 'ht5', 'lt5'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [pRes, gmRes] = await Promise.all([getPlayers(), getGamemodes()]);
      setPlayers(pRes.data);
      setGamemodes(gmRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const ranks = formData.gamemode && formData.rank
        ? [{ gamemode: formData.gamemode, rank: formData.rank }]
        : [];
      await addPlayer(formData.username, formData.email, ranks);
      setFormData({ username: '', email: '', gamemode: '', rank: '' });
      setShowForm(false);
      fetchData();
    } catch (err) {
      console.error('Error adding player:', err);
    }
  };

  const handleUpdateRank = async (playerId) => {
    try {
      await updatePlayerRank(playerId, editGamemode, editRank);
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error('Error updating rank:', err);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    if (window.confirm('DELETE THIS PLAYER?')) {
      try {
        await deletePlayer(playerId);
        fetchData();
      } catch (err) {
        console.error('Error deleting player:', err);
      }
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>⚙️ ADMIN PANEL ⚙️</h1>
        <button
          className="button-minecraft"
          onClick={() => setShowForm(!showForm)}
        >
          <FaPlusCircle /> {showForm ? 'CANCEL' : 'ADD PLAYER'}
        </button>
      </div>

      {showForm && (
        <div className="admin-form">
          <h2>ADD NEW PLAYER</h2>
          <form onSubmit={handleAddPlayer}>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <select
              value={formData.gamemode}
              onChange={(e) => setFormData({ ...formData, gamemode: e.target.value })}
            >
              <option value="">SELECT GAMEMODE</option>
              {gamemodes.map((gm) => (
                <option key={gm._id} value={gm.name}>
                  {gm.name}
                </option>
              ))}
            </select>
            <select
              value={formData.rank}
              onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
            >
              <option value="">SELECT RANK</option>
              {rankOrder.map((rank) => (
                <option key={rank} value={rank}>
                  {rank.toUpperCase()}
                </option>
              ))}
            </select>
            <button type="submit" className="button-minecraft">ADD PLAYER</button>
          </form>
        </div>
      )}

      <div className="players-list">
        <h2>PLAYERS ({players.length})</h2>
        {players.length > 0 ? (
          <div className="players-table">
            {players.map((player) => (
              <div key={player._id} className="player-card">
                <div className="player-info">
                  <div className="player-name">{player.username}</div>
                  <div className="player-email">{player.email}</div>
                </div>
                <div className="player-ranks">
                  {player.ranks && player.ranks.length > 0 ? (
                    player.ranks.map((r, idx) => (
                      <div key={idx} className="rank-badge">
                        {r.gamemode}: <span className="rank-value">{r.rank}</span>
                      </div>
                    ))
                  ) : (
                    <div className="no-rank">NO RANKS</div>
                  )}
                </div>
                <div className="player-actions">
                  {editingId === player._id ? (
                    <div className="edit-form">
                      <select
                        value={editGamemode}
                        onChange={(e) => setEditGamemode(e.target.value)}
                      >
                        <option value="">GAMEMODE</option>
                        {gamemodes.map((gm) => (
                          <option key={gm._id} value={gm.name}>
                            {gm.name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={editRank}
                        onChange={(e) => setEditRank(e.target.value)}
                      >
                        <option value="">RANK</option>
                        {rankOrder.map((rank) => (
                          <option key={rank} value={rank}>
                            {rank.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <button
                        className="button-minecraft"
                        onClick={() => handleUpdateRank(player._id)}
                      >
                        SAVE
                      </button>
                      <button
                        className="button-minecraft"
                        onClick={() => setEditingId(null)}
                      >
                        CANCEL
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        className="button-minecraft"
                        onClick={() => {
                          setEditingId(player._id);
                          setEditGamemode('');
                          setEditRank('');
                        }}
                      >
                        EDIT
                      </button>
                      <button
                        className="button-minecraft danger"
                        onClick={() => handleDeletePlayer(player._id)}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-data">NO PLAYERS FOUND</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
