import db from '../models/dbConnections';
import bcrypt from 'bcryptjs';

class UserModel {
    static async findByEmail(email: string) {
        const [rows] = (await db.execute('SELECT * FROM user WHERE email = ?', [email])) as any;
        return rows[0];
    }

    static async create({ name, email, password=null, profilePic = null }: any) {
        let hashedPassword = null;

        // Only hash the password if it exists (manual sign up)
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        const [result] = (await db.execute(
            'INSERT INTO user (name, email, password, image) VALUES (?, ?, ?, ?)', 
            [name, email, hashedPassword, profilePic]
        )) as any;

        return {
            id: result.insertId,
            name,
            email,
            profilePic
        };
    }
}

export default UserModel;