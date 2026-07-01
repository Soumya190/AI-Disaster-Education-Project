import jwt from 'jsonwebtoken';

import {OAuth2Client} from 'google-auth-library';
import axios from 'axios';
import UserModel from '../models/userModel.ts';


const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
)

const googleLogin=async(req:any,res:any)=>{
    console.log("!!! CONTROLLER HIT !!! Request query:", req.query);

    try{
        const {code} = req.query;
        
        if(!code){
            return res.status(400).json({
                message:"Authorization code is required"
            })
        }

        const googleResponse = await client.getToken(code as string);
        client.setCredentials(googleResponse.tokens);

        const userInfoRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`)

        const{name,email,picture} = userInfoRes.data;

        let user = await UserModel.findByEmail(email);

        if(!user){
            user = await UserModel.create({name,email,profilePic:picture});
        }

        const userId = user.id||user.user_id;

        const token = jwt.sign(
            {userId},
            process.env.JWT_SECRET||"fallback_secret",
            {
            expiresIn:process.env.JWT_TIMEOUT||'24h' as any}
        );

        return res.status(200).json({
            message:"sucess",
            token,
            user
        })
    }
    catch (err: any) {
        
        console.error("=================== GOOGLE AUTH CRASH ===================");
        console.error(err);
        console.error("=========================================================");

        return res.status(500).json({
            message: "Internal server error",
            error: err.message 
        });
    }
}

export default googleLogin;