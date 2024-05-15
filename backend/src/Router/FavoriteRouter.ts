import express from 'express';
import { FavoriteController } from '../Controller/FavoriteController';

const router = express.Router();

export const FavoriteRouter = (
    controller: FavoriteController
): express.Router => {
    router.post('/addFavorites', controller.addToFavorites);
    router.post('/removeFavorites', controller.rmvFromFavorites);
    return router;
}
