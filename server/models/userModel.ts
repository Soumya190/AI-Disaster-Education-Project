import mysql from 'mysql2';
import db from '../models/dbConnections.ts';


class UserModel {
    static async findByEmail(email: any) {
        const [rows] = (await db.execute('SELECT * FROM user WHERE email = ?', [email])) as any;
        return rows[0];
    }

    static async create({name,email,profilePic}:any){
        const [result] = (await db.execute('INSERT INTO user (name,email,image) VALUES(?,?,?)' , [name,email,profilePic])) as any;

        return {
            id:result.insertId,
            name,
            email,
            profilePic
        }
    }
}

export default UserModel;