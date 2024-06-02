import React from "react";
import { useRecoilValue } from "recoil";
import { MarvelApi, currentPage, movies } from "RecoilAtom";
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
        <Container>
            <DropdownWrapper>
                <Dropdown onChange={changeArrayment}/>
            </DropdownWrapper>
            <ListContainer data-testid="movie-list">
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
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const DropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start; 
  margin-bottom: 20px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; 
  padding: 20px; 
  width: 100%;
`;