import React from "react";
import { CharacterList } from "src/organisms/List/ItemList";
import { SearchBar } from "src/molecules/searchBar/BaseSearchBar";
import { searchOutput, searchValue } from "RecoilAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { SearchedElements } from "src/organisms/SearchedElements";
import { useSearchOutput } from "customHooks";
import { BasicPagination } from "src/molecules/PageNation/PagenationControls";

export const CharacterDefault: React.FC = () => {
    const searchResults = useRecoilValue(searchOutput);
    const [searchWord, setSearchWord] = useRecoilState(searchValue);
    useSearchOutput();

    return (
        <>
            <SearchBar value={searchWord} onChange={setSearchWord} />
            {searchResults.length > 0 ? <SearchedElements /> : <CharacterList />}
            <BasicPagination />
        </>
    );
}