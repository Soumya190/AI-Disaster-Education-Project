import express from 'express';
import googleLogin from '../controllers/authController.ts';

const router = express.Router();

router.get('/test',(req,res)=>{
    res.send("test page");
})

router.get('/google',googleLogin);

export default router;