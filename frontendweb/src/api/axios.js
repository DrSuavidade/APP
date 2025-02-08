import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendscout-cx6c.onrender.com/api', // Certifique-se de usar a URL correta
});

export default api;