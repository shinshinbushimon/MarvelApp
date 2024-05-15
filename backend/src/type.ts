import { Collection, Db, MongoClient, Document } from "mongodb"

export interface documentDBOption {
    useNewUrlParser: boolean,
    useUnifiedTopology: boolean,
    tls: boolean
}

/*
    Dbオブジェクトを外部から受け取ります。
    DocumentDB interfaceの実行クラスはコレクションに特化しており、
    インスタンス名と該当のコレクションが対応しています。
*/
export interface DocumentDB {
    collectionName: string,
    collection: Collection<any>;
    connectCollection: () => void; 
}

export interface UserFavDocument {
    userId: string,
    characterIds: number[]
}

export interface mySQLAuth {
    host: string,
    user: string,
    password: string,
    databaseName: string
}