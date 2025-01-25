import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Certifique-se de usar a URL correta
});

export default api;