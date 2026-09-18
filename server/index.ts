import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import router from './routes/authRouter';
import cors from 'cors';


const app =  express();
const PORT = process.env.PORT||8003;

import  './models/dbConnections';



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