import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:3131' });

export const createChat = (data) => API.post('/api/chat/new', data);

export const userChats = (id) => API.get(`/api/chat/all/${id}`);

export const findChat = (firstId, secondId) => API.get(`/api/chat/private/${firstId}/${secondId}`);