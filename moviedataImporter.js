require('dotenv').config();
const axios = require('axios');
const fs = require('fs');

async function fetchMovies() {
  try {
    // 各ページからデータを取得
    const pages = [1, 2];
    const allData = [];

    for (let page of pages) {
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
      allData.push(...response.data.results);
    }

    // データをJSONファイルとして保存
    fs.writeFile('moviesData.json', JSON.stringify(allData, null, 2), (err) => {
      if (err) {
        console.error('Error writing JSON to file:', err);
      } else {
        console.log('Saved movie data to "moviesData.json"');
      }
    });

  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}

fetchMovies();
