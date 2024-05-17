import FavoriteRepository from "../Repository/FavoriteRepositry";
import SessionRepository from "../Repository/SessionRepository";
import express from "express";
import { logger } from "../util/Logger";

export class SessionController {
    constructor(
        private SessionRepo: SessionRepository,
        private FavRepo: FavoriteRepository
    ) {}

    addSession = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const sessionId = req.cookies.sessionId;  // クッキーからセッションIDを取得
            const username = req.body.username;
            
            if (!sessionId) {
                // セッションIDが存在しない場合は新しいセッションを作成
                const newSessionId = await this.SessionRepo.createSession(username);  // 新しいセッションIDを作成するメソッドを呼び出す
                res.cookie('sessionId', newSessionId, { 
                    httpOnly: true,  // クライアントサイドのJavaScriptからクッキーにアクセスできないようにする
                    secure: process.env.NODE_ENV === 'production',  // 本番環境ではセキュアなクッキーを使用
                    maxAge: 24 * 60 * 60 * 1000  // クッキーの有効期限を1日に設定
                });
                res.status(201).json({ success: true, message: '新しいセッションが作成されました' });
                return;
            }
            
            // セッションIDが存在する場合の処理を追加（例：既存のセッションを更新するなど）
            res.status(200).json({ success: true, message: '既存のセッションが確認されました' });
    
        } catch (error) {
            logger.error("セッション追加でエラー発生: " + error.message);
            res.status(500).json({ success: false, message: 'セッション追加に失敗しました' });
            console.error(error);
            next(error);
        }
    }

    getSession = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            if (!req.cookies) {
                throw new Error('クッキーが見つかりません');
            }
    
            const sessionId = req.cookies.sessionId;  // クッキーからセッションIDを取得
            if (!sessionId) {
                logger.info("セッションがないぽいです");
                res.json({
                    loggedIn: false,
                    accountData: []
                });
                return;
            }
    
            const userSessionData = await this.SessionRepo.getUserBySessionId(sessionId);
            if (!userSessionData || !userSessionData.userId) {
                logger.info("無効なセッションIDです");
                res.json({
                    loggedIn: false,
                    accountData: []
                });
                return;
            }
            // ここまで来たらセッションが確認できたということ
            const username = userSessionData.userId;
            const favoriteIds = await this.FavRepo.getFavoritesByUserId(username);
            console.log("this user's favoriteIds are ", favoriteIds);
    
            res.json({
                loggedIn: true,
                accountData: favoriteIds
            });
        } catch (error) {
            logger.error("session err", error.message);
            console.error(error);
            res.json({
                success: false,
                message: error.message
            });
            next(error);
        }
    }
    
    
    removeSession = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const sessionId = req.cookies.sessionId;  // クッキーからセッションIDを取得
            if (sessionId) {
                await this.SessionRepo.removeSession(sessionId);
                res.status(200).send('セッションが正常に削除されました。');
            }
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
    
}
