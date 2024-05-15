/*
    user情報追加の際にミドルウェアとしてバリデーションルールを追加する
*/ 
import express from 'express';
import { SessionController } from '../Controller/SessionController';
import { UserInfoController } from '../Controller/UserInfoController';
import { userValidationRules } from '../Validation/ItemValidator';
import { validationResult } from 'express-validator';

const router = express.Router();

export const UserInfoRouter = (
    sessionController: SessionController,
    userController: UserInfoController
): express.Router => {
    router.get('/first-ope', sessionController.getSession);

    router.post('/new-register', userValidationRules, 
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() });
        }
        next();
    }, userController.addUsr);

    router.post('/login', userValidationRules, 
    (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() });
        }
        next();
    }, 
    userController.existUser,
    userController.existPass,
    sessionController.addSession
);
    return router;
}