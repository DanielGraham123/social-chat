import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:3131' });

export const getMessages = (id) => API.get(`/api/message/${id}`);

export const addMessage = (data) => API.post('/api/message/new', data);