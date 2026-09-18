
import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:8000/auth"
});

export const googleAuth = (code:string) => api.get(`/google?code=${code}`);

