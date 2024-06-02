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
    characterIds: number[],
    movieIds: number[]
}

export interface UserFavIds {
    characterIds: number[],
    movieIds: number[]
}

export interface mySQLAuth {
    host: string,
    user: string,
    password: string,
    databaseName: string
}

export interface MovieData {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}  

interface Translation {
    detected_source_language: string;
    text: string;
}
  
export interface DeepLResponse {
    translations: Translation[];
}
