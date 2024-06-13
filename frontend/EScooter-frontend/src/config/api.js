import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-51-21-128-251.eu-north-1.compute.amazonaws.com:8080/api',
});

export default api;