import FavoriteRepository from "../Repository/FavoriteRepositry";
import express from 'express';
import SessionRepository from "../Repository/SessionRepository";

export class FavoriteController {
    constructor(
        private FavoriteRepo: FavoriteRepository,
        private SessRepo: SessionRepository
    ) {}

    addToFavorites = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) : Promise<void> => {
        try {
            const sessionId = req.cookies.sessionId;
            let username: string;
            if (sessionId) {
                const userdata = await this.SessRepo.getUserBySessionId(sessionId);
                if (!userdata || !userdata.userId) {
                    res.status(400).json({ success: false, message: '無効なセッションIDです' });
                    return;
                }
                username = userdata.userId;
            } else {
                // セッションがない場合はリクエストボディからユーザー名を取得
                username = req.body.username;
                if (!username) {
                    res.status(400).json({ success: false, message: 'ユーザー名が提供されていません' });
                    return;
                }
                const newSessionId = await this.SessRepo.createSession(username);
                res.cookie('sessionId', newSessionId, { 
                    httpOnly: true, 
                    secure: process.env.NODE_ENV === 'production', 
                    maxAge: 24 * 60 * 60 * 1000  // クッキーの有効期限を1日に設定
                });

            }
            const { characterId } = req.body;
            await this.FavoriteRepo.addCharToFavorites(username, characterId);
            res.status(200).json({ success: true, message: "お気に入りにアイテムを追加しました" });

        } catch (e) {
            res.status(500).json({ success: false, message: "お気に入りアイテムの追加に失敗しました" });
            next(e);
        }
    }

    rmvFromFavorites = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const { userId, characterId } = req.body;
            await this.FavoriteRepo.rmvCharFromFavorites(userId, characterId);
            res.status(200).send("お気に入りにアイテムを削除しました");

        } catch (e) {
            res.status(500).send("お気に入りアイテムの削除に失敗しました");
            next(e);
        }
    }
}