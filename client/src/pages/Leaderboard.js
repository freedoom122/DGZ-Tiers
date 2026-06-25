import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLeaderboard } from '../api/api';
import './Leaderboard.css';

const Leaderboard = () => {
  const { gamemode } = useParams();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await getLeaderboard(gamemode);
        setLeaderboard(res.data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [gamemode]);

  const getRankColor = (rank) => {
    const rankLower = rank.toLowerCase();
    if (rankLower === 'ht1') return '#FFD700';
    if (rankLower === 'lt1') return '#C0C0C0';
    if (rankLower === 'ht2') return '#CD7F32';
    if (rankLower.startsWith('lt')) return '#888';
    return '#4CAF50';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h1>🏆 {gamemode.toUpperCase()} LEADERBOARD 🏆</h1>
      </div>

      <div className="leaderboard-table">
        <div className="leaderboard-row header-row">
          <div className="rank-pos">#</div>
          <div className="player-name">PLAYER</div>
          <div className="tier-display">TIER</div>
        </div>
        {leaderboard.length > 0 ? (
          leaderboard.map((player, index) => (
            <div key={player._id} className="leaderboard-row">
              <div className="rank-pos">{index + 1}</div>
              <div className="player-name">{player.username}</div>
              <div className="tier-display" style={{ color: getRankColor(player.currentRank) }}>
                {player.currentRank}
              </div>
            </div>
          ))
        ) : (
          <div className="no-data">NO PLAYERS IN THIS GAMEMODE YET</div>
        )}
      </div>

      <div className="total-players">TOTAL RANKED: {leaderboard.length}</div>
    </div>
  );
};

export default Leaderboard;
