
import axios from 'axios';

const api = axios.create({
    baseURL:"http://localhost:8000/auth"
});

export const googleAuth = (code: string) => {
    return api.get('/google', {
        params: {
            code: code
        }
    });
};

