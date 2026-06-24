import express from 'express';
import dotenv from 'dotenv';
import nodemon from 'nodemon';
import router from './routes/authRouter.ts';

dotenv.config();

const app =  express();
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Server is running');
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})

app.use('/auth',router);


bg2textcolorconstract: [["#ACDDE6","#10461C"],]