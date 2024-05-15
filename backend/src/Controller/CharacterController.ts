import express from "express";
import { CharacterRepository } from "../Repository/CharacterRepositry";
import { generateParam } from "../util/utilities";
import ExternalAPIRepository from "../Repository/ExternalAPIRepository";
import { logger } from "../util/Logger";

export class CharacterController {
    constructor(
        private charRepos: CharacterRepository,
        private ExternalAPIRepo: ExternalAPIRepository
    ) {
        if (!this.charRepos) {
            console.error("charRepos is not initialized.");
            logger.error("charRepos is not initialized.");
        } else {
            console.log("charRepos is initialized successfully.");
            logger.info("charRepos is initialized successfully.");
        }

        if (!this.ExternalAPIRepo) {
            console.error("ExternalAPIRepo is not initialized.");
            logger.error("ExternalAPIRepo is not initialized.");
        } else {
            console.log("ExternalAPIRepo is initialized successfully.");
            logger.info("ExternalAPIRepo is initialized successfully.");
        }

    }

    getDataAmount = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const result = await this.charRepos.getDataCount();
            res.status(200).json({ dataCount: result });
        } catch (e) {
            logger.error("データ件数が取得できませんでした。");
            res.status(500).send("データ件数が取得できませんでした。");
            next(e);
        }
    }

    getPagingData = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const page = Number(req.query.page);
            const limit = 20;
            const results = await this.charRepos.getPagination(page, limit);
            res.status(200).json(results);
        } catch(e) {
            logger.error("ページネーションが失敗しました", e);
            next(e);
            res.status(500).send("ページネーションが失敗しました");

        }

    }

    searchChar = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const keyWord = req.query.name;
            if(!keyWord) return;
            const result = this.charRepos.searchCharByKey(keyWord as string);
            res.status(200).json(result);
        } catch (e) {
            logger.error("キャラクターデータ取得に失敗しました");
            next(e);
            res.status(500).send("キャラクターデータ取得に失敗しました");
        }
    }

    getCharDetail = async(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const characterId = Number(req.query.characterId);
            const result = this.charRepos.findCharById(characterId);
            res.status(200).json(result);
        } catch (e) {
            logger.error('Internal Server Error');
            res.status(500).send('Internal Server Error');
            next(e);
        }
    }
    // http://gateway.marvel.com/v1/public/characters がbaseUrlと想定
    getOtherResource = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        const offset = req.query.offset;
        const { characterId, resourceType } = req.params;
        const keyParam = generateParam();
        const requestPart = `/${characterId}/${resourceType}${keyParam}&offset=${offset}`;
        
        try {
            const result = await this.ExternalAPIRepo.fetchData(requestPart);
            res.status(200).json(result);
        } catch (e) {
            logger.error("APIのデータ取得に失敗しました");
            res.status(500).send("APIのデータ取得に失敗しました");
            next(e);
        }
    }

}