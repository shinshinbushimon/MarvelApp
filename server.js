require('dotenv').config();
const express = require('express')
const session = require('express-session');
const axios = require('axios')
const md5 = require('md5')
const cors = require('cors')
const { MongoClient } = require('mongodb'); // mongoのドライバオブジェクト
const MongoStore = require('connect-mongo');
const validateCredentials = require('./ItemValidator'); // validationのパターン
const { validationResult } = require('express-validator');

// userInfoデータベースのfavoritesコレクションにお気に入りキャラクタの保存
const marvelDBName = 'marvel';
const collectionOfChar = 'characters';
const collectionOfFav = 'favorites';

const app = express();
const port = process.env.PORT || 3001; //3001

const mongoUri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@marvelapidocumentdbs2.cbycq6848fnf.ap-northeast-1.docdb.amazonaws.com:27017/${marvelDBName}?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;
const tlsCAFilePath = process.env.PRODUCTION_TLS_CA_FILE;


let database; // 今後使いまわすデータベース

async function connectToMongo() {
    try {
        // tlsCAFile オプションを指定して接続
        const client = await MongoClient.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,
            tlsCAFile: tlsCAFilePath // CA証明書のパスを指定
        });
        database = client.db(marvelDBName);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Could not connect to MongoDB', error);
    }
}

// APIパラメータ生成
const generateParam = () => {
    const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + privateKey + publicKey);
    return `?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
}


MongoClient.connect()
// CORS設定
const corsOptions = {
    origin: 'http://localhost:8080', // フロントエンドサーバのオリジン
    credentials: true, // 資格情報を含むリクエストを許可
    optionsSuccessStatus: 200 // 一部のレガシーブラウザの対応
};

app.use(cors(corsOptions));
app.use(session({
    secret: 'secretKey', // セッションを安全に保持するための秘密鍵
    store: MongoStore.create({
        mongoUrl: mongoUri,
        collectionName: 'sessions'
    }),
    resave: false, // セッションが変更されない限りセッションを保存しない
    saveUninitialized: true, // 初期化されていないセッションを強制的に保存する
    cookie: { secure: false } // HTTPSを使用する場合はtrueに設定
  }));

app.use(express.json());


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

// MongoDBからデータ数を取得する処理で、初めに一回だけリクエストされる
app.get('/marvel-characters/data-count', async (req, res) => {
    try {
        console.log("received data count request!!!");
        const characters = database.collection(collectionOfChar);
        const count = await characters.countDocuments();
        res.json({dataCount: count});
    } catch (err) {
        console.error(err);
        res.json({success: false, message: 'fuck!!!'});
    }

});


app.get('/marvel-characters', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    console.log("get request!!!");
    
    try {
        const characters = database.collection(collectionOfChar);

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

    try {
        console.log(`currentKeyWord is ${keyWord}`)
        
        const characters = database.collection(collectionOfChar);
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

    try {
        console.log(`currentKeyWord is ${characterId}`)
        const characters = database.collection(collectionOfChar);
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

// お気に入りの登録
app.post('/addFavorites', (req, res) => {
    console.log("received the addFavorites request!!");
    const { userId, characterId } = req.body;
    try {
        const favorites = database.collection(collectionOfFav);
        favorites.updateOne(
            { "userId": userId },
            { "$push": { "characterIds": characterId } },
            { "upsert": true }
        );

        return res.json({success: true, message: 'data was updated successfully!!'});
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: 'fuck!!!'});
    }
});

// お気に入りの削除
app.post('/removeFavorites', (req, res) => {
    console.log("received the rmvFavorites request!!");
    const { userId, characterId } = req.body;
    try {
        const favorites = database.collection(collectionOfFav);
        favorites.updateOne(
            { "userId": userId },
            { "$pull": { "characterIds": characterId } },
        );

        return res.json({success: true, message: 'data was removed successfully!!'});
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: 'fuck!!!'});
    }
});

// sessionの発行とクッキーの登録
const saveSession = () => {

}

app.post('/session-generate', (req, res) => {
    const { userId } = req.body;
    req.session.userId = userId; // sessionに格納
    res.send('session is created successfully');
});


// 新規登録処理（フロント側と同様のバリデーションを実施）
app.post('/new-register', validateCredentials, (req, res) => {
    console.log('received the register request!!!');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg).join('\n');
        return res.status(400).json({ 
            success: false,
            message: errorMessages
        });
    }

    const { userId, password } = req.body;
    console.log("This message is in server-side");
    console.log("userId is ", userId);
    console.log("password is ", password);
    
    // RDBMSに接続して、userId重複がないか（後ほどRDBMSに対応改修）
    const tempCheck = userId === 'admin' && password === 'password';
    if (!tempCheck) {
        return res.status(400).json({ 
            success: false,
            message: "already has that id.." 
        });
    }
    
    req.session.userId = userId; // sessionに格納
    res.json({
        success: true,
        message: 'session is created successfully',
    });

});


// ログイン処理（フロント側と同様のバリデーションを実施）
app.post('/login', validateCredentials, (req, res) => {
    console.log('received the login request!!!');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array().toString()
        });
    }

    // RDBMSに接続して、アカウントがあるかの確認

    // userid, passwordのバリデーション成功時にsession-generateにリダイレクト
    const { userId } = req.body;
    req.session.userId = userId; // sessionに格納
    res.json({
        success: true,
        message: 'session is created successfully',
    });

});


// 初期起動時
app.get('/first-ope', async (req, res) => {
    console.log("The initial confignition is successfull!!!");

    if (req.session.userId) { // sessionにuserIdが存在した場合、Mongoセッションストアからuser情報を取得して
        try {
            const favoritesCollection = database.collection(collectionOfFav); 
            const userIdAndFavorite = await favoritesCollection.findOne({ userId: req.session.userId }); // データ構造：userId: characterId[]

            if(userIdAndFavorite) { // データのマッピングが存在した場合、
                const returnObj =  userIdAndFavorite.characterIds ? userIdAndFavorite.characterIds : [];
                return res.json({
                    loggedIn: true,
                    accountData: returnObj // これは、キャラクターidの配列. 後ほど画面側でこのデータを基に取得
                }); // ここではitemsがお気に入りの配列と仮定
            }

        } catch (error) {
            console.error('Error fetching favorites:', error);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            });
        }
    } else {
        // req.session.userIdが存在しない場合、手動ログインアカウント認証操作
        // ここでは単純なリダイレクトを行うが、実際にはログインページへのリダイレクトや、
        // ログイン処理を行うエンドポイントへの案内を行う場合が多い
        console.log('For now, redirect to the login domain');
        return res.json({
            loggedIn: false,
            accountData: []
        });
    }
});




async function startServer() {
    try {
        await connectToMongo(); // 接続が完了するまで待つ
        console.log('Database connected, starting server...');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}


startServer(); // サーバーとDB接続の初期化を行う
