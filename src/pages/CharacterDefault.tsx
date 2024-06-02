import React, { useEffect, useState } from "react";
import { CharacterList } from "src/organisms/List/ItemList";
import { SearchBar } from "src/molecules/searchBar/BaseSearchBar";
import { searchOutput, searchValue } from "RecoilAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchedElements } from "src/organisms/SearchedElements";
import { useSearchOutput } from "customHooks";
import { BasicPagination } from "src/molecules/PageNation/PagenationControls";

export const CharacterDefault: React.FC = () => {
    const FetchWaitTime = 2000;
    useSearchOutput();
    const searchResults = useRecoilValue(searchOutput);
    const [searchWord, setSearchWord] = useRecoilState(searchValue);
    const [isLoading, setIsLoading] = useState(false);
    const [isTimedOut, setIsTimedOut] = useState(false);

    useEffect(() => {
        if (searchWord) {
            setIsLoading(true);
            setIsTimedOut(false);
            const timeoutId = setTimeout(() => {
                setIsTimedOut(true);
                setIsLoading(false);
            }, FetchWaitTime); 

            return () => clearTimeout(timeoutId); 
        } else {
            setIsLoading(false);
        }
    }, [searchWord]);

    useEffect(() => {
        if (searchResults.length > 0) {
            setIsLoading(false);
        }
    }, [searchResults]);


    const renderContent = () => {
        if (!searchWord) {
            return <CharacterList />;
        } else if (isLoading) {
            return <p>データを取得しています...</p>;
        } else if (isTimedOut && searchResults.length === 0) {
            return <p>関連するキャラクターが存在しませんでした</p>;
        } else {
            return <SearchedElements />;
        }
    };

    return (
        <>
            <SearchBar 
                value={searchWord} 
                onChange={setSearchWord} 
                placeholder="キャラクターの英語名を入力してください 例）spiderman"
            />
            {renderContent()}
            <BasicPagination />
        </>
    );
};