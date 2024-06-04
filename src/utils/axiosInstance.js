// src/utils/axiosInstance.js
import axios from 'axios';
import configuration from '../config';

const axiosInstance = axios.create({
  baseURL: configuration.apiUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
