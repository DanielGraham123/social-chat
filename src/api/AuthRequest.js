import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3131' });

export const logIn = (formData) => API.post('/api/auth/login', formData);

export const signUp = (formData) => API.post('/api/auth/register', formData);