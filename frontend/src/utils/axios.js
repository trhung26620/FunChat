import axios from 'axios';
import authHeader from './auth-header';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
    headers: authHeader()
});

export default instance;
