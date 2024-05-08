import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MarvelApi, currentPage, movieArrPatern, movies } from "RecoilAtom";
import { CharacterItem, MovieItem  } from "src/molecules/CharacterItem";
import { CustomLink } from "src/atoms/Link/BaseLink";
import styled from "styled-components";
import { Dropdown } from "src/atoms/Dropdown/Dropdown";
import { useChangeArrayment } from "customHooks";

export const CharacterList: React.FC = () => {
    const apiData = useRecoilValue(MarvelApi);
    const pageKey = useRecoilValue(currentPage);


    return (
        <ListContainer data-testid="character-list">
            {apiData[pageKey] ? 
                apiData[pageKey].map(character => 
                    <CustomLink key={character.id} to={`/character/detail/?characterId=${character.id}`}>
                        <CharacterItem {...character} />
                    </CustomLink>
                    
                )
                :
                (<p>データを取得しています。。。</p>)
            }
        </ListContainer>
    );
}

// TMdbのデータが一階で取れることを予想
export const MovieList: React.FC = () => {
    const moviesData = useRecoilValue(movies);
    const changeArrayment = useChangeArrayment();
    
    return (
        <ListContainer data-testid="movie-list">
            <Dropdown onChange={changeArrayment}/>
            {moviesData ? 
                moviesData.map(movieInfo => 
                    <CustomLink key={movieInfo.id} to={`/movie/detail/?movieId=${movieInfo.id}`}>
                        <MovieItem {...movieInfo} />
                    </CustomLink>
                    
                )
                :
                (<p>データを取得しています。。。</p>)
            }
        </ListContainer>
    );
}

/*
export const FavoriteList: React.FC = () => {
    const apiData = useRecoilValue(MarvelApi);
    const pageKey = useRecoilValue(currentPage);


    return (
        <ListContainer data-testid="character-list">
            {apiData[pageKey] ? 
                apiData[pageKey].map(character => 
                    <CustomLink key={character.id} to={`/character/detail/?characterId=${character.id}`}>
                        <CharacterItem {...character} />
                    </CustomLink>
                    
                )
                :
                (<p>データを取得しています。。。</p>)
            }
        </ListContainer>
    );
}
*/
const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* アイテムがコンテナの幅を超えたら次の行に折り返す */
  justify-content: space-around; /* アイテム間に均等なスペースを設置 */
  padding: 20px; /* リスト全体のパディング */
`;
