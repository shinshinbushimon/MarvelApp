import express from 'express';
import { CharacterController } from '../Controller/CharacterController';

const router = express.Router();

export const CharacterRoutes = (
    controller: CharacterController
): express.Router => {
    router.get('/marvel-characters', controller.getPagingData);
    router.get('/marvel-characters/data-count', controller.getDataAmount);
    router.get('/marvel-characters-search', controller.searchChar);
    router.get('/marvel-character-detail', controller.getCharDetail);
    router.get('/marvel-characters/:characterId/:resourceType', controller.getOtherResource);
    return router;
}