import express from 'express';
import dotenv from 'dotenv';
import nodemon from 'nodemon';
import router from './routes/authRouter.ts';

dotenv.config();

const app =  express();
const PORT = process.env.PORT;
import cors from 'cors';
import models from './models/dbConnections.ts';

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}));

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Server is running');
})

app.use('/auth',router);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})



// bg2textcolorconstract: [["#ACDDE6","#10461C"],]