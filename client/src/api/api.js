import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signup = (username, email, password) =>
  API.post('/auth/signup', { username, email, password });

export const login = (email, password) =>
  API.post('/auth/login', { email, password });

export const getPlayers = () => API.get('/players');

export const addPlayer = (username, email, ranks) =>
  API.post('/players', { username, email, ranks });

export const updatePlayerRank = (id, gamemode, rank) =>
  API.put(`/players/${id}`, { gamemode, rank });

export const getGamemodes = () => API.get('/gamemodes');

export const addGamemode = (name, icon, description) =>
  API.post('/gamemodes', { name, icon, description });

export const getLeaderboard = (gamemode) =>
  API.get(`/leaderboard/${gamemode}`);

export const getAdminStats = () => API.get('/admin/stats');

export const deletePlayer = (id) => API.delete(`/admin/players/${id}`);

export default API;
