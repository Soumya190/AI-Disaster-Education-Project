import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if(!DATABASE_URL){
    throw new Error("DATABASE_URL is not defined in the environment variables.");
}

const dbConnection = mysql.createPool(DATABASE_URL);

console.log("Connected to the database successfully.");

export default dbConnection;