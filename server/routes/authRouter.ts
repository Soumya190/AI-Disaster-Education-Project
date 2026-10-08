import express from 'express';
import { signup, login, googleSignup, googleLogin } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/google-signup', googleSignup);
router.get('/google-login', googleLogin);

export default router;