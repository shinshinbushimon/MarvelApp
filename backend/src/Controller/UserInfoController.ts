import UserInfoRepository from "../Repository/UserInfoRepository";
import express from 'express';
import { logger } from "../util/Logger";
import FavoriteRepository from "../Repository/FavoriteRepositry";

export class UserInfoController {
    constructor(
        private UserRepo: UserInfoRepository,
        private FavRepo: FavoriteRepository
    ){}

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
                res.status(404).json({
                    type: 'repository',
                    value: username,
                    msg: 'ユーザが存在しません。',
                    path: 'username',
                    location: 'existUser'
                });
                return;
            }
            next();
        } catch (e) {
            logger.error(`Error checking if user exists: ${e.message}`);
            res.status(500).json({ success: false, message: 'userデータの取得に失敗しました' });
            next(e);
        }
    }
    // login時のユーザネーム認証が通った後でしか呼ばれない
    existPass = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const { username, password, sessionPermission } = req.body;
            const existUser = await this.UserRepo.existPassWord(username, password);
            if (!existUser) {
                res.status(401).json({
                    type: 'repository',
                    value: password,
                    msg: 'パスワードが誤っています。',
                    path: 'password',
                    location: 'existPass'
                });
                return;
            }
            // ここでお気に入りアイテムを返すように
            const usersFavorites = await this.FavRepo.getFavoritesByUserId(username);
            res.locals.usersFavorites = usersFavorites;
            res.locals.sessionPermission = sessionPermission;
            next();// session追加処理
        } catch (e) {
            logger.error(`Error checking if password exists: ${e.message}`);
            res.status(500).json({
                type: 'repository',
                value: '',
                msg: 'サーバでのパスワード処理に失敗しました',
                path: 'password',
                location: 'existPass'
            });
            next(e);
        }
    }

    addUsr = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const { username, password, sessionPermission } = req.body;
            const { existUserInfo, addUser } = this.UserRepo;
            if(await existUserInfo(username)) {
                res.status(401).json({
                    type: 'repository',
                    value: username,
                    msg: 'ユーザネームが既に存在します',
                    path: 'username',
                    location: 'addUsr'
                });
                return;
            }
            await addUser({ username, password });
            res.locals.sessionPermission = sessionPermission;
            res.locals.usersFavorites = [];
            next();
        } catch (err) {
            logger.error(`Error adding user: ${err.message}`);
            res.status(500).json({
                type: 'repository',
                value: '',
                msg: 'サーバでの認証が失敗しました',
                path: 'username',
                location: 'addUsr'
            });
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
            res.status(500).json({
                type: 'repository',
                value: '',
                msg: 'サーバでの削除処理に失敗しました',
                path: 'username and password',
                location: 'rmvUsr'
            });
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