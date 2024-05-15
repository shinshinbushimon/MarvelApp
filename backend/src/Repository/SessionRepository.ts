import { Collection, Db, Document } from "mongodb";
import { DocumentDB } from "../type";
import { generateSessionId } from "../util/utilities";

class SessionRepository implements DocumentDB{
    collectionName: string;
    collection: Collection<Document>;

    constructor(
        private database: Db
    ){
        this.collectionName = 'sessions';
        this.connectCollection();
    }

    connectCollection = () => {
        try {
            this.collection = this.database.collection(this.collectionName);
            this.collection.createIndex({"createdAt": 1}, {expireAfterSeconds: 3600});
        } catch (err) {
            console.error(err);
            throw new Error(`Database Collection error: ${err.message}`);
        }
    }

    createSession = async (username: string): Promise<string> => {
        const sessionId = generateSessionId(username);
        await this.database.collection(this.collectionName).insertOne({ sessionId, username });
        return sessionId;
    }

    addSession = async (sessionId: string, username: string): Promise<void> => {
        await this.database.collection(this.collectionName).updateOne(
            { sessionId },
            { $set: { username } },
            { upsert: true }
        );
    }

    getUserBySessionId = async (sessionId: string): Promise<{ userId: string } | null> => {
        const session = await this.database.collection(this.collectionName).findOne({ sessionId });
        if (session) {
            return { userId: session.username }; // ここでuserIdを返す
        }
        return null;
    }

    removeSession = async (sessionId: string): Promise<void> => {
        await this.collection.deleteOne({sessionId});
    }


}

export default SessionRepository;