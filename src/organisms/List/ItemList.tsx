import React from "react";
import { useRecoilValue } from "recoil";
import { MarvelApi, currentPage } from "RecoilAtom";
import { CharacterItem } from "src/molecules/CharacterItem";
import { CustomLink } from "src/atoms/Link/BaseLink";
import styled from "styled-components";

export const CharacterList: React.FC = () => {
    const apiData = useRecoilValue(MarvelApi);
    const pageKey = useRecoilValue(currentPage);


    return (
        <ListContainer>
            {apiData[pageKey] ? 
                apiData[pageKey].map(character => 
                    <CustomLink to={`/character/detail/?characterId=${character.id}`}>
                        <CharacterItem key={character.id} {...character} />
                    </CustomLink>
                    
                )
                :
                (<p>データを取得しています。。。</p>)
            }
        </ListContainer>
    );
}

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* アイテムがコンテナの幅を超えたら次の行に折り返す */
  justify-content: space-around; /* アイテム間に均等なスペースを設置 */
  padding: 20px; /* リスト全体のパディング */
`;


// CharacterItem内で使用する画像
/*
const BaseImage = styled(RoundImage)`
  // RoundImageのスタイルを継承し、追加で特定のスタイルを指定可能 
`;
*/