import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if(!DATABASE_URL){
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const connection = mysql.createConnection(DATABASE_URL);

connection.connect((err:any)=>{
    if(err){
        console.log("Error connecting to the database:",err);
    }
    else{
        console.log("Connected to the database successfully.");
    }
})

export default connection;