import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8000/auth"
});

// 1. For the Login Page (Rejects if user doesn't exist)
export const googleLoginApi = (code: string) => api.get(`/google-login?code=${code}`);

// 2. For the Sign Up Page (Creates user if they don't exist)
export const googleSignupApi = (code: string) => api.get(`/google-signup?code=${code}`);

// 3. Manual Email/Password Signup
export const signUpData = (userData: any) => api.post('/signup', userData);

// (Optional) 4. Manual Email/Password Login
export const loginData = (userData: any) => api.post('/login', userData);