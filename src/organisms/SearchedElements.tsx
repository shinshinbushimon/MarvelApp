import React from "react";
import { useRecoilValue } from "recoil";
import { movies, searchOutput } from "RecoilAtom";
import { CustomLink } from "src/atoms/Link/BaseLink";
import { CharacterItem, MovieItem } from "src/molecules/CharacterItem";
import { MovieData } from "src/type/app";
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

export const SearchedMovieElements: React.FC<{ search: MovieData[] }> = ( { search } ) => {
    return (
        <div data-testid="searched-movie-elements">
            {search.length > 0 ? 
            search.map((movieInfo) =>
                <CustomLink to={`/movie/detail/?movieId=${movieInfo.id}`}>
                    <CharacterItemContainer>
                        <MovieItem key={movieInfo.id} {...movieInfo} />
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
  margin: 10px; 
  background-color: #ffffff;
  border-radius: 4px; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); 
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03); 
  }
`;