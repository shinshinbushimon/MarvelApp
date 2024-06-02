const { default: axios } = require("axios");
require('dotenv').config();


const url = `https://api.themoviedb.org/3/movie/429617/credits?api_key=${process.env.TMDb_API_KEY}`;

const fetchData = async () => {
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${process.env.TMDb_API_ACCESS_TOKEN}`
        }
    });
    const castData = res.data.cast;
    const characters = castData.map(person => ({
        character: person.character, 
        actor: person.name 
    }));
    console.log(characters);
    
}
fetchData();

