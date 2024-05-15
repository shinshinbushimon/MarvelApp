import express from 'express';
import { MovieController } from '../Controller/MovieController';

const router = express.Router();

export const MovieRouter = (
    controller: MovieController
): express.Router => {
    router.get('/marvel-movies', controller.getMovie);
    router.get('/marvel-movies/cast', controller.movieAPIFetcher);
    return router;
}