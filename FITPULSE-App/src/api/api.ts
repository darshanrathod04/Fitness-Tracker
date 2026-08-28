import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { API_BASE_URL, API_TIMEOUT_MS } from '../config/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT_MS,
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