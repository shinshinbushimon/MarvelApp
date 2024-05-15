/*
 mysqlのユーザ情報の格納
 userとpasswordが正当かどうかbooleanで返すメソッド
 userがすでに存在しているかどうかのbooleanで返すメソッド
 を個別で実装し、それをユーザ情報格納処理やアカウント認証処理で使用する
 他はデータを探して返す処理などを実装する。
*/

import { ResultSetHeader, Pool, RowDataPacket, createPool } from "mysql2/promise";
import bcrypt from 'bcrypt';
import { mySQLAuth } from "../type";
import { logger } from "../util/Logger";

class UserInfoRepository {
    private db: Pool;

    constructor(
        private mySQLOpt: mySQLAuth,
        private tableName: string
    ) {
        const { host, user, password, databaseName } = this.mySQLOpt;
        this.db = createPool({
            host: host,
            user: user,
            password: password,
            database: databaseName,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    existUserInfo = async (username: string): Promise<boolean> => {
        try {
            const [rows] = await this.db.execute(`SELECT COUNT(*) AS count FROM ${ this.tableName } WHERE username = ?`, [username]);
            return rows[0].count > 0;
        } catch (err) {
            logger.error(`Error checking if user exists: ${err.message}`);
            throw new Error('Error checking if user exists');
        }
    }

    existPassWord = async (username: string, password: string): Promise<boolean> => {
        try {
            const [rows] = await this.db.execute<RowDataPacket[]>(`SELECT password FROM ${ this.tableName } WHERE username = ?`, [username]);
            if (rows.length > 0) {
                const storedPassword = rows[0].password;
                return bcrypt.compare(password, storedPassword);
            }
            return false;
        } catch (err) {
            logger.error(`Error checking if password exists: ${err.message}`);
            throw new Error('Error checking if password exists');
        }
    }

    addUser = async (userInfo: {username: string, password: string}): Promise<void> => {
        const { username, password } = userInfo;
        const saltRounds = 10;
        try {
            const passHash = await bcrypt.hash(password, saltRounds);
            await this.db.execute(`INSERT INTO ${ this.tableName } (username, password) VALUES (?, ?)`, [username, passHash]);
        } catch (err) {
            logger.error(`Error adding user: ${err.message}`);
            throw new Error('Error adding user');
        }
    }

    removeUser = async (username: string): Promise<boolean> => {
        try {
            const [result] = await this.db.execute<ResultSetHeader>(`DELETE FROM ${ this.tableName } WHERE username = ?`, [username]);
            return result.affectedRows > 0;
        } catch (err) {
            logger.error(`Error removing user: ${err.message}`);
            throw new Error('Error removing user');
        }
    }

    close = async (): Promise<void> => {
        try {
            await this.db.end();
        } catch (err) {
            logger.error(`Error closing the database connection: ${err.message}`);
            throw new Error('Error closing the database connection');
        }
    }

}

export default UserInfoRepository;