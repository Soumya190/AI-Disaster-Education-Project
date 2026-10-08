import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import axios from 'axios';
import UserModel from '../models/userModel';
import bcrypt from 'bcryptjs';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
);

// ==========================================
// 1. GOOGLE SIGNUP (Creates account if new)
// ==========================================
export const googleSignup = async (req: any, res: any) => {
    try {
        const { code } = req.query;
        if (!code) return res.status(400).json({ message: "Authorization code is required" });

        const googleResponse = await client.getToken(code as string);
        client.setCredentials(googleResponse.tokens);

        const userInfoRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);
        const { name, email, picture } = userInfoRes.data;

        let user = await UserModel.findByEmail(email);
        if (user) {
            return res.status(409).json({ message: "This email is already registered. Please log in instead." });
        }

        user = await UserModel.create({ name, email, password: null, profilePic: picture, createdAt: new Date() });

        const userId = user.id || user.user_id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: '24h' });

        return res.status(201).json({ message: "User registered successfully!", token, user });
    } catch (err: any) {
        console.error("GOOGLE SIGNUP CRASH:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// ==========================================
// 2. GOOGLE LOGIN (Fails if account doesn't exist)
// ==========================================
export const googleLogin = async (req: any, res: any) => {
    try {
        const { code } = req.query;
        if (!code) return res.status(400).json({ message: "Authorization code is required" });

        const googleResponse = await client.getToken(code as string);
        client.setCredentials(googleResponse.tokens);

        const userInfoRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);
        const { email } = userInfoRes.data;

        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "No account found with this email. Please sign up first." });
        }

        const userId = user.id || user.user_id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: '24h' });

        return res.status(200).json({ message: "success", token, user });
    } catch (err: any) {
        console.error("GOOGLE LOGIN CRASH:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// ==========================================
// 3. MANUAL SIGNUP (Email & Password)
// ==========================================
export const signup = async (req: any, res: any) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await UserModel.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "This email is already registered. Please log in instead." });
        }

        const defaultProfilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true`;

        const newUser = await UserModel.create({ name, email, password, profilePic: defaultProfilePic, createdAt: new Date() });

        const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: '24h' });

        return res.status(201).json({ message: "User registered successfully!", token, user: newUser });
    } catch (err: any) {
        console.error("SIGNUP CRASH:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

// ==========================================
// 4. MANUAL LOGIN (Email & Password)
// ==========================================
export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "No account found with this email. Please sign up first." });
        }

        // Check if password matches using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const userId = user.id || user.user_id;
        const token = jwt.sign({ userId }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: '24h' });

        return res.status(200).json({ message: "Login successful!", token, user });
    } catch (err: any) {
        console.error("LOGIN CRASH:", err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};