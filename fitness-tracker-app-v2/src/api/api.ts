import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API = axios.create({
  baseURL: 'http://10.164.252.38:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically attach JWT to every request
API.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('jwt');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;