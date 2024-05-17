// repositoryからrouteまですべてインスタンス作成して統合させること
import dotenv from 'dotenv';
import { MongoClient, Db } from 'mongodb';
import { logger } from './util/Logger';
import express from 'express';
import cookieParser from 'cookie-parser';
import { CharacterRepository } from './Repository/CharacterRepositry';
import { CharacterController } from './Controller/CharacterController';
import ExternalAPIRepository from './Repository/ExternalAPIRepository';
import FavoriteRepository from './Repository/FavoriteRepositry';
import { FavoriteController } from './Controller/FavoriteController';
import SessionRepository from './Repository/SessionRepository';
import { SessionController } from './Controller/SessionController';
import UserInfoRepository from './Repository/UserInfoRepository';
import MovieRepository from './Repository/MovieRepository';
import { MovieController } from './Controller/MovieController';
import { documentDBOption, mySQLAuth } from './type';
import { UserInfoController } from './Controller/UserInfoController';
import { CharacterRoutes } from './Router/CharacterRouter';
import { FavoriteRouter } from './Router/FavoriteRouter';
import { MovieRouter } from './Router/MovieRouter';
import { UserInfoRouter } from './Router/UserInfoRouter';

dotenv.config();

const app: express.Express = express();
app.use(express.json());
app.use(cookieParser())
const port = process.env.PORT || 3001;

// DBとコレクション一覧
const marvelDBName = 'MarvelAppDatabase';
const collectionOfChar = 'characters';
const collectionOfFav = 'favorites';
const collectionOfMovie = 'movies';
const tableName = 'users';

// 接続URI
const mongoUri = process.env.MONGO_URI;
const docDBOpt: documentDBOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: process.env.NODE_ENV === 'production'
}


async function connectMongo(): Promise<Db> {
    try {
        // tlsCAFile オプションを指定して接続
        const client = await MongoClient.connect(mongoUri, docDBOpt);
        const MDatabase = client.db(marvelDBName);
        logger.info('Connected to MongoDB');
        return MDatabase;
    } catch (error) {
        logger.error('Could not connect to MongoDB', error);
    }
}

const marvelBase = 'http://gateway.marvel.com/v1/public/characters';
const movieBase = 'https://api.themoviedb.org/3/movie';
const mySqlOpt: mySQLAuth = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_INITDB_ROOT_PASSWORD,
    databaseName: process.env.MYSQL_DATABASE

}

export const startMarvelApp = async (): Promise<express.Express> => {
    try {
        const MDatabase = await connectMongo();
        const charRepo = new CharacterRepository(MDatabase, collectionOfChar);
        if(charRepo !== undefined) logger.info('charRepo is initialized successfully');

        const marvelApiFetcher = new ExternalAPIRepository(marvelBase);
        const charController = new CharacterController(charRepo, marvelApiFetcher);

        const movieRepo = new MovieRepository(MDatabase, collectionOfMovie);
        const movieApiFetcher = new ExternalAPIRepository(movieBase);
        const movieController = new MovieController(movieRepo, movieApiFetcher);

        const sessRepo = new SessionRepository(MDatabase);
        const favRepo = new FavoriteRepository(MDatabase, collectionOfFav);
        const favController = new FavoriteController(favRepo, sessRepo);
        const sessController = new SessionController(sessRepo, favRepo);

        const userRepo = new UserInfoRepository(mySqlOpt, tableName);
        const userController = new UserInfoController(userRepo, favRepo);

        app.use("/", CharacterRoutes(charController));
        app.use("/", FavoriteRouter(favController));
        app.use("/", MovieRouter(movieController));
        app.use("/", UserInfoRouter(sessController, userController));

        app.use(
            (
              err: Error,
              req: express.Request,
              res: express.Response,
              next: express.NextFunction
            ) => {
              logger.error(err.message);
              res.status(500).send("サーバー内部でエラーが発生しました");
            }
        );

        return app;
    } catch (error) {
        logger.error('Failed to initialize the application:', error);
        throw error;
    }
}

startMarvelApp().then(app => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
        logger.info(`Server is running on http://localhost:${port}`);
    });
}).catch(error => {
    console.error('Failed to start the server:', error);
    logger.error('Failed to start the server:', error);
});