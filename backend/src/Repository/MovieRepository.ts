import { Collection, Db } from "mongodb";
import { DocumentDB } from "../type";
import { MovieData } from "../shared-types/app";
import { logger } from "../util/Logger";

class MovieRepository implements DocumentDB {
    collectionName: string;
    collection: Collection<any>;

    constructor(
        private database: Db,
        collectionName: string
    ) {
        this.collectionName = collectionName;
        this.connectCollection();
    }

    connectCollection = () => {
        try {
            this.collection = this.database.collection(this.collectionName);
        } catch (err) {
            console.error(err);
            throw new Error(`Database Collection error: ${err.message}`);
        }
    }

    getMovieData = async (): Promise<any> => {
        return await this.collection.find({}).toArray();
    }

    getFavMovieDatas = async (targetMovieIds: number[]): Promise<MovieData[]> => {
        try {
            const movieDatas = await this.collection.find({ id: { $in: targetMovieIds } }).toArray();
            return movieDatas as MovieData[];
        } catch(e) {
            logger.error(`映画情報の取得に失敗`);
            throw new Error(e.message);
        }
    } 

}

export default MovieRepository;