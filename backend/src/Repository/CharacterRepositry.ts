import { Db, Collection, Document } from "mongodb";
import { DocumentDB } from "../type";
import { logger } from "../util/Logger";
import { Character } from "../shared-types/Character";


export class CharacterRepository implements DocumentDB{
    collectionName: string;
    collection: Collection<Document>;

    constructor(
        private database: Db,
        collectionName: string
    ){
        this.collectionName = collectionName;
        this.connectCollection();
        
    }

    connectCollection = () => {
        try {
            this.collection = this.database.collection(this.collectionName);
        } catch (err) {
            logger.error(err);
            throw new Error(`Database Collection error: ${err.message}`);
        }
    }

    getDataCount = async () => {
        return await this.collection.countDocuments();
    }

    public async getPagination(page: number, limit: number) {
        const offset = (page - 1) * limit;
        
        try {
            const results = await this.collection.find({}).skip(offset).limit(limit).toArray();
            return results;

        } catch (err) {
            logger.error(err);
            throw new Error(`Database pagination error: ${err.message}`);
        }
    }

    searchCharByKey = async (keyWord: string) => {
        if(!keyWord) return;

        try {
            const results = await this.collection.find({
                name: { $regex: keyWord, $options: 'i' }
            }).toArray();
            return results;
        } catch (err) {
            logger.error('Database fetching failed:', err);
            throw new Error(`Database Search error: ${err.message}`);
        }
    }

    findCharById = async (characterId: number) => {
        if(!characterId) return;

        try {
            const result = await this.collection.findOne({ id: characterId });
            return result;
        } catch (err) {
            logger.error(`Database Detail error: ${err.message}`);
            throw new Error(`Database Detail error: ${err.message}`);
        }
    }

    // コレクションから お気に入り に含まれるキャラクターを全て取得
    findSomeCharsById = 
    async (targetCharIds: number[])
    : Promise<Character[]> => {
        try {
            const result = await this.collection.find({ id: { $in: targetCharIds } }).toArray();
            console.log('これはお気に入りアイテムとして取得したキャラクターの結果です', result);
            return result as Character[];
        } catch (error) {
            console.error("Error fetching favorite characters:", error);
            throw new Error("Failed to fetch favorite characters");
        }
    }
    



}

