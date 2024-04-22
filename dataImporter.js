require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const filename = 'marvel-characters.json'

const fetchAllMarvelCharacters = async () => {
    const characters = [];
    const publicKey = process.env.MARVEL_API_PUBLIC_KEY;
    const privateKey = process.env.MARVEL_API_PRIVATE_KEY;
    let total = 0, offset = 0, limit = 20;

    do {
        const ts = new Date().getTime();
        const hash = require('crypto').createHash('md5').update(ts + privateKey + publicKey).digest('hex');
        const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

        try {
            const response = await axios.get(url);
            characters.push(...response.data.data.results);
            total = response.data.data.total;
            offset += response.data.data.count;
        } catch (error) {
            console.error('Error fetching Marvel characters:', error);
            break;
        }
    } while (offset < total);

    return characters;
};

const saveCharactersToJsonFile = (characters) => {
    fs.writeFile(filename, JSON.stringify(characters, null, 2), (err) => {
        if (err) {
            console.error('Error writing characters to file:', err);
        } else {
            console.log('Characters saved to characters.json');
        }
    });
};

const refreshData = async () => {
    const characters = await fetchAllMarvelCharacters();
    if (characters.length > 0) {
        saveCharactersToJsonFile(characters);
    } else {
        console.log('No characters to save');
    }
};

refreshData();
