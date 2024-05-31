import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API URL
});

export default api;