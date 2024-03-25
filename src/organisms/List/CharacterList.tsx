import React from "react";
import { useRecoilValue } from "recoil";
import { MarvelApi, currentPage } from "RecoilAtom";
import { CharacterItem } from "src/molecules/CharacterItem";
import { CustomLink } from "src/atoms/Link/BaseLink";

export const CharacterList: React.FC = () => {
    const apiData = useRecoilValue(MarvelApi);
    const pageKey = useRecoilValue(currentPage);


    return (
        <>
            {apiData[pageKey] ? 
                apiData[pageKey].map(character => 
                    <CustomLink to={`/detail/character/?characterId=${character.id}`}>
                        <CharacterItem key={character.id} {...character} />
                    </CustomLink>
                    
                )
                :
                (<p>データを取得しています。。。</p>)
            }
        </>
    );
}