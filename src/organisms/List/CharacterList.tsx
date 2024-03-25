import React from "react";
import { useRecoilValue } from "recoil";
import { MarvelApi, currentPage } from "RecoilAtom";
import { CharacterItem } from "src/molecules/CharacterItem";

export const CharacterList: React.FC = () => {
    const apiData = useRecoilValue(MarvelApi);
    const pageKey = useRecoilValue(currentPage);


    return (
        <>
            {apiData[pageKey] ? 
                apiData[pageKey].map(character => 
                    <CharacterItem key={character.id} {...character} />
                )
                :
                (<p>データを取得しています。。。</p>)
            }
        </>
    );
}