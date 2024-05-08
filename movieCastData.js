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

/*
const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {
      api_key: `${process.env.TMDb_API_KEY}`,
      with_genres: '28,12,878',
      with_companies: '420',
      'release_date.gte': '2008-01-01',
      'release_date.lte': '2023-01-01',
      sort_by: 'release_date.desc',
      include_adult: 'false',
      region: 'US',
      language: 'ja',
      page: page
    },
    headers: {
      Authorization: `Bearer ${process.env.TMDb_API_ACCESS_TOKEN}`
    }
  });
*/