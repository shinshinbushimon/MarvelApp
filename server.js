require('dotenv').config();
const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const cors = require('cors')
const { MongoClient } = require('mongodb'); // mongoのドライバオブジェクト


const app = express();
const port = process.env.PORT || 3001; //3001
app.use(cors());

// APIパラメータ生成
const generateParam = () => {
    const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + privateKey + publicKey);
    return `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
}

const createMongoDriver = () => {
    const mongoUrl = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/myMarvelDatabase?authSource=admin`;
    return new MongoClient(mongoUrl)
}

app.get('/marvel-characters/:characterId/:resourceType', async (req, res) => {
    console.log("get request!!! characterId!!")
    const offset = req.query.offset;
    const { characterId, resourceType } = req.params;
    const keyParam = generateParam();
    const requestPart = `${characterId}/${resourceType}`;
    const baseURL = `http://gateway.marvel.com/v1/public/characters/${requestPart}`;

    try {
        const response = await axios.get(`${baseURL+keyParam}&offset=${offset}`);
        res.json(response.data);
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/marvel-characters', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    console.log("get request!!!");
    const client = createMongoDriver();

    try {
        await client.connect();
        const database = client.db('marvel');
        const characters = database.collection('characters');

        const results = await characters.find({}).skip(offset).limit(limit).toArray();
        res.json(results);
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).send('Internal Server Error');
    }
});

// search用で、dbに対して検索の処理
app.get('/marvel-characters-search', async (req, res) => {
    // 以下dbデータ取得処理を実行
    const keyWord = req.query.name || '';
    
    console.log("get search request!!!");
    const client = createMongoDriver();

    try {
        console.log(`currentKeyWord is ${keyWord}`)
        await client.connect();
        const database = client.db('marvel');
        const characters = database.collection('characters');
        // keyWordが空の場合、空の配列を返す
        if (!keyWord) {
            res.json([]);
            return;
        }
        
        const results = await characters.find({
            name: { $regex: keyWord, $options: 'i' }
        }).toArray();
        
        res.json(results);    
    } catch (error) {
        console.error('Database fetching failed:', error);
        res.status(500).send('Internal Server Error');
    }
});


// リスト画面押下で詳細画面を表示するための処理
app.get(`/marvel-character-detail`, async (req, res) => {
    // 以下dbデータ取得処理を実行
    const characterId = Number(req.query.characterId);
    
    console.log("get search detail request!!!");
    const client = createMongoDriver();

    try {
        console.log(`currentKeyWord is ${characterId}`)
        await client.connect();
        const database = client.db('marvel');
        const characters = database.collection('characters');
        // characterIdが空の場合、空の配列を返す
        if (!characterId) {
            res.json();
            return;
        }
        
        const results = await characters.findOne({ id: characterId });
        console.log("resuilts is ", results)
        
        res.json(results);    
    } catch (error) {
        console.error('Database fetching failed:', error);
        res.status(500).send('Internal Server Error');
    }
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});