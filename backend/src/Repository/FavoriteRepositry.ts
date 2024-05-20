import { Collection, Db } from "mongodb";
import { DocumentDB, UserFavDocument, UserFavIds } from "../type";
import { logger } from "../util/Logger";
import { Character } from "../shared-types/Character";

class FavoriteRepository implements DocumentDB {
    collectionName: string;
    collection: Collection<UserFavDocument>;

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

    getFavoritesByUserId = async (userId: string): Promise<UserFavIds> => {
        try {
            const result = await this.collection.findOne(
                { "userId": userId },
                { projection: { characterIds: 1, movieIds: 1, _id: 0 } }
            );
            console.log("favorite results are", result);
            if (!result) {
                return {
                    characterIds: [],
                    movieIds: []
                };
            }

            // 結果が存在しない場合、空の配列を返す
            const characterIds = result?.characterIds || [];
            const movieIds = result?.movieIds || [];
            return { characterIds, movieIds };

        } catch (err) {
            console.error(err);
            logger.error(err.message);
            throw new Error(`Database read error: ${err.message}`);
        }
    }    


    addCharToFavorites = async (userId: string, characterId: number) => {
        try {
            // まず、ユーザーのドキュメントを取得してキャラクターIDが既に存在するか確認
            const userFavorites = await this.collection.findOne({ "userId": userId });
            
            if (userFavorites && userFavorites.characterIds.includes(characterId)) {
                logger.info("Character already in favorites");
                return;
            }
    
            // キャラクターIDが存在しない場合に追加
            await this.collection.updateOne(
                { "userId": userId },
                { "$push": { "characterIds": characterId } },
                { "upsert": true }
            );
    
            console.log("Adding success");
        } catch (err) {
            console.error(err);
            throw new Error(`Database addFavorite error: ${err.message}`);
        }
    }

    addMovieToFavorites = async (userId: string, movieId: number) => {
        try {
            // まず、ユーザーのドキュメントを取得してキャラクターIDが既に存在するか確認
            const userFavorites = await this.collection.findOne({ "userId": userId });
            
            if (userFavorites && userFavorites.movieIds && userFavorites.movieIds.includes(movieId)) {
                logger.info("Character already in favorites");
                return;
            }
    
            // キャラクターIDが存在しない場合に追加
            await this.collection.updateOne(
                { "userId": userId },
                { "$push": { "movieIds": movieId } },
                { "upsert": true }
            );
    
            console.log("Movie Item Adding success");
        } catch (err) {
            console.error(err);
            throw new Error(`Database addFavorite error: ${err.message}`);
        }
    }

    
    rmvCharFromFavorites = async (userId: string, characterId: number) => {
        try {
            await this.collection.updateOne(
                { "userId": userId },
                { "$pull": { "characterIds": characterId } },
            );
    
            console.log("removing success");
        } catch (err) {
            console.error(err);
            throw new Error(`Database addFavorite error: ${err.message}`);
        }
    
    }

    rmvMovieFromFavorites = async (userId: string, movieId: number) => {
        try {
            await this.collection.updateOne(
                { "userId": userId },
                { "$pull": { "movieIds": movieId } },
            );
    
            console.log("removing success");
        } catch (err) {
            console.error(err);
            throw new Error(`Database addFavorite error: ${err.message}`);
        }
    }


}

export default FavoriteRepository;