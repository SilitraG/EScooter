import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:8081/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
