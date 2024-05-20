import express from 'express';
import { FavoriteController } from '../Controller/FavoriteController';

const router = express.Router();

export const FavoriteRouter = (
    controller: FavoriteController
): express.Router => {
    router.post('/addFavorites', controller.addToFavorites);
    router.post('/removeFavorites', controller.rmvFromFavorites);
    router.post('/addMovieFavorites', controller.addToMovieFavorites);
    router.post('/removeMovieFavorites', controller.rmvFromMovieFavorites);    
    router.post('/get-favorite-data', controller.getFavoriteDatas);
    return router;
}
