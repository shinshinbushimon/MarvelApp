require('dotenv').config();
const express = require('express')
const axios = require('axios')
const md5 = require('md5')
const cors = require('cors')


const app = express();
const port = process.env.PORT || 3001;
app.use(cors());

app.get('/marvel-characters', async (req, res) => {
    console.log("get request!!!")
    const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    const timestamp = new Date().getTime();
    const hash = md5(timestamp + privateKey + publicKey);
    //const baseURL = `http://gateway.marvel.com/v1/public/comics`;
    const baseURL = `http://gateway.marvel.com/v1/public/characters`;
    //const baseURL = `http://gateway.marvel.com/v1/public/comics/1220/characters`;

    try {
        const response = await axios.get(`${baseURL}?ts=${timestamp}&apikey=${publicKey}&hash=${hash}`);
        res.json(response.data);
    } catch (error) {
        console.error('API call failed:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});