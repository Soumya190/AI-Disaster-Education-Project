import express from 'express';
import dotenv from 'dotenv';
import nodemon from 'nodemon';

const app =  express();
const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('Server is running');
})

app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})