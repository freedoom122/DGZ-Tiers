import React, { useEffect, useState } from 'react';
import { getGamemodes, getPlayers } from '../api/api';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [gamemodes, setGamemodes] = useState([]);
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gmRes = await getGamemodes();
        const pRes = await getPlayers();
        setGamemodes(gmRes.data);
        setPlayers(pRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🏆 DGZ-TIERS 🏆</h1>
        <p>MINECRAFT TIER TESTING PLATFORM</p>
      </div>

      <div className="stats-section">
        <div className="stat-box">
          <h3>TOTAL PLAYERS</h3>
          <p className="stat-number">{players.length}</p>
        </div>
        <div className="stat-box">
          <h3>GAMEMODES</h3>
          <p className="stat-number">{gamemodes.length}</p>
        </div>
      </div>

      <div className="gamemodes-section">
        <h2>SELECT GAMEMODE</h2>
        <div className="gamemodes-grid">
          {gamemodes.length > 0 ? (
            gamemodes.map((gamemode) => (
              <Link
                key={gamemode._id}
                to={`/leaderboard/${gamemode.name}`}
                className="gamemode-card"
              >
                <div className="gamemode-icon">{gamemode.icon}</div>
                <div className="gamemode-name">{gamemode.name}</div>
              </Link>
            ))
          ) : (
            <p className="no-data">NO GAMEMODES AVAILABLE</p>
          )}
        </div>
      </div>

      <div className="info-section">
        <h2>TIER SYSTEM</h2>
        <div className="tier-info">
          <div className="tier-item">🥇 HT1 - HIGH TIER 1 (BEST)</div>
          <div className="tier-item">🥈 LT1 - LOW TIER 1</div>
          <div className="tier-item">🥉 HT2 - HIGH TIER 2</div>
          <div className="tier-item">📊 LT2 - LOW TIER 2</div>
          <div className="tier-item">📋 HT3 - HIGH TIER 3</div>
          <div className="tier-item">📋 LT3 - LOW TIER 3</div>
          <div className="tier-item">📋 HT4 - HIGH TIER 4</div>
          <div className="tier-item">📋 LT4 - LOW TIER 4</div>
          <div className="tier-item">⭐ HT5 - HIGH TIER 5</div>
          <div className="tier-item">⭐ LT5 - LOW TIER 5 (BEGINNER)</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
