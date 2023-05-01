import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default instance;
