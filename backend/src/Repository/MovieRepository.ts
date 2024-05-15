import { Collection, Db } from "mongodb";
import { DocumentDB } from "../type";

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

}

export default MovieRepository;