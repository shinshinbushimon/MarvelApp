import React, { useEffect, useState } from "react";
import { MovieList } from "src/organisms/List/ItemList";
import { SearchBar } from "src/molecules/searchBar/BaseSearchBar";
import { movies } from "RecoilAtom"; 
import { useRecoilValue } from "recoil";
import { SearchedMovieElements } from "src/organisms/SearchedElements";
import { hiraToKata, useFetchMoviesData } from "customHooks";

export const MovieInfo: React.FC = () => {
    useFetchMoviesData(); 
    const allMovieData = useRecoilValue(movies);
    
    
    const [searchWord, setSearchWord] = useState('');
    const [searchResults, setSearchResults] = useState([]); 

    useEffect(() => {
        if (searchWord) {
            const filteredMovies = allMovieData.filter(movie =>
                movie.title.includes(hiraToKata(searchWord))
            );
            setSearchResults(filteredMovies);
        }
    }, [searchWord, allMovieData]);

    return (
        <>
            <SearchBar value={searchWord} onChange={setSearchWord} placeholder="キーワードを入力..." />
            {searchWord && searchResults.length > 0 ? (
                <SearchedMovieElements search={searchResults} />
            ) : searchWord && searchResults.length === 0 ? (
                <p>検索結果がありません。</p>
            ) : (
                <MovieList />
            )}
        </>
    );
};
