import ExternalAPIRepository from "../Repository/ExternalAPIRepository";
import express, { NextFunction } from 'express';
import { logger } from "../util/Logger";

class TranslateController {
    constructor(
        private apiRepo: ExternalAPIRepository
    ){}

    generateTranslatedText = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const { targetText, targetLang } = req.body;
            const translatedText = await this.apiRepo.textTranslate(targetText, targetLang);
            res.status(200).json({"translatedText": translatedText});
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }
}

export default TranslateController;