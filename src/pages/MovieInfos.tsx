import React, { useEffect, useState } from "react";
import { MovieList } from "src/organisms/List/ItemList";
import { SearchBar } from "src/molecules/searchBar/BaseSearchBar";
import { movies } from "RecoilAtom"; // Recoilのatomから適切にimportすることを確認
import { useRecoilValue } from "recoil";
import { SearchedMovieElements } from "src/organisms/SearchedElements";
import { hiraToKata, useFetchMoviesData } from "customHooks";

export const MovieInfo: React.FC = () => {
    useFetchMoviesData(); // 映画データの取得
    const allMovieData = useRecoilValue(movies);
    console.log("moviedatas are ", allMovieData);
    
    // searchWordをuseStateでローカル管理
    const [searchWord, setSearchWord] = useState('');
    const [searchResults, setSearchResults] = useState([]); // 検索結果の状態もローカルで管理

    // 検索ワードが変更されたときにフィルタリングを実行
    useEffect(() => {
        if (searchWord) {
            const filteredMovies = allMovieData.filter(movie =>
                movie.title.includes(hiraToKata(searchWord))
            );
            setSearchResults(filteredMovies);
        }
    }, [searchWord, allMovieData]);
    console.log("the number of searched movie are", searchResults.length);

    return (
        <>
            <SearchBar value={searchWord} onChange={setSearchWord} />
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
