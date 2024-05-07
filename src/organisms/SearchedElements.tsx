import React from "react";
import { useRecoilValue } from "recoil";
import { searchOutput } from "RecoilAtom";
import { CustomLink } from "src/atoms/Link/BaseLink";
import { CharacterItem } from "src/molecules/CharacterItem";
import styled from "styled-components";

export const SearchedElements: React.FC = () => {
    const searchedItems = useRecoilValue(searchOutput);

    return (
        <div data-testid="searched-elements">
            {searchedItems.length > 0 ? 
            searchedItems.map((character) =>
                <CustomLink to={`/character/detail/?characterId=${character.id}`}>
                    <CharacterItemContainer>
                        <CharacterItem key={character.id} {...character} />
                    </CharacterItemContainer>
                    
                </CustomLink>
            )
            :
            (<p>データが見つかりませんでした。</p>) }
        </div>
    );
}

const CharacterItemContainer = styled.div`
  padding: 10px;
  margin: 10px; /* アイテム間にマージンを設定 */
  background-color: #ffffff; /* アイテムの背景色を白に */
  border-radius: 4px; /* 角丸デザイン */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); /* より細かいシャドウ */
  transition: transform 0.2s; /* ホバー時の動きを滑らかに */

  &:hover {
    transform: scale(1.03); /* ホバー時に少し拡大 */
  }
`;