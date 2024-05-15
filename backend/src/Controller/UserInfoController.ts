import UserInfoRepository from "../Repository/UserInfoRepository";
import express from 'express';
import { logger } from "../util/Logger";

export class UserInfoController {
    constructor(private UserRepo: UserInfoRepository){}

    // 真偽値ではなく、データの件数を返す。これが0か1以上あるかで判定
    existUser = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const { username } = req.body;
            const existUser = await this.UserRepo.existUserInfo(username);
            if (!existUser) {
                res.status(404).json({ message: "該当のuserが存在しません", exist: false });
                return;
            }
            next();
        } catch (e) {
            logger.error(`Error checking if user exists: ${e.message}`);
            res.status(500).json({ success: false, message: 'userデータの取得に失敗しました' });
            next(e);
        }
    }

    existPass = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const { username, password } = req.body;
            const existUser = await this.UserRepo.existPassWord(username, password);
            if (!existUser) {
                res.status(401).json({ message: "パスワードが誤っています", exist: false });
                return;
            }
            next();
        } catch (e) {
            logger.error(`Error checking if password exists: ${e.message}`);
            res.status(500).json({ message: 'userpasswordデータの取得に失敗しました', success: false });
            next(e);
        }
    }

    addUsr = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const { username, password } = req.body;
            console.log('Received body:', req.body);
            console.log('userId は', username);
            const { existUserInfo, addUser } = this.UserRepo;
            if(await existUserInfo(username)) {
                res.status(401).json({ message: 'user名が既に存在します', success: false });
                return;
            }
            await addUser({ username, password });
            res.status(200).json({ message: 'user情報が登録されました', success: true });
        } catch (err) {
            logger.error(`Error adding user: ${err.message}`);
            res.status(500).json({ message: 'user認証に失敗しました', success: false });
            next(err);
        }
    }

    rmvUsr = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const { username } = req.body;
            const rmvResult = await this.UserRepo.removeUser(username);
            if (rmvResult) {
                res.status(200).json({
                    message: '正常に削除されました',
                    success: true
                });
                return;
            } else {
                res.status(200).json({
                    message: 'ユーザが見つかりません',
                    success: false
                });
                return;
            }
        } catch (e) {
            logger.error(`Error removing user: ${e.message}`);
            res.status(500).json({ success: false, message: 'ユーザの削除処理に失敗しました' });
            next(e);
        }
    }

    CloseDB = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            await this.UserRepo.close();
            res.status(200).json({ success: true, message: 'データベースが正常に閉じられました' });
        } catch (err) {
            logger.error(`Error closing the database connection: ${err.message}`);
            res.status(500).json({ success: false, message: 'データベース切断に失敗しました' });
            next(err);
        }
    }}