require('dotenv').config();
const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const cors = require('cors')


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

app.get('/marvel-characters', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    console.log("get request!!!");
    const keyParam = generateParam();
    const baseURL = `http://gateway.marvel.com/v1/public/characters`;

    try {
        const response = await axios.get(`${baseURL}${keyParam}&limit=${limit}&offset=${offset}`);
        res.json(response.data);
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/marvel-characters/:characterId/:resourceType', async (req, res) => {
    console.log("get request!!! characterId!!")
    const { characterId, resourceType} = req.params;
    const keyParam = generateParam();
    const baseURL = `http://gateway.marvel.com/v1/public/characters/${characterId}${resourceType ? '/' + resourceType : ''}`;

    try {
        const response = await axios.get(`${baseURL+keyParam}`);
        res.json(response.data);
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});