import { loggedInMovieItem, movies } from "RecoilAtom";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { BackButton } from "src/atoms/Btn/BackButton";
import { FavoriteProps } from "src/type/app";
import { FavoriteIcon } from "src/atoms/Icon/BaseIcon";
import { FavoriteItemType } from "src/type/enum";

const DetailContainer = styled.div<{ background: string }>`
  background-image: url(${props => props.background});
  background-size: cover; 
  background-position: center;  
  background-repeat: no-repeat;  
  color: white;
  padding: 20px;
  width: 100%;
  height: 100vh;
`;

const TitleContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);  
  padding: 10px;
  border-radius: 5px;
  display: inline-block; 
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
`;

const OverviewContainer = styled.div<{ hasOverview: boolean }>`
  background-color: rgba(0, 0, 0, 0.7);  
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  display: ${props => (props.hasOverview ? 'block' : 'none')}; 
`;

const Overview = styled.p`
  font-size: 1.3rem;  
  font-weight: bold;  
`;

const FavoriteIconContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7);  
  padding: 5px;
  border-radius: 50%;  
  display: inline-block;
  margin-bottom: 20px;
`;

const PopularityReleaseDateContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.7); 
  padding: 10px;
  border-radius: 5px;
  display: inline-block;
  margin-top: 20px;
`;

const Popularity = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const ReleaseDate = styled.span`
  font-size: 1rem;
  margin-left: 20px;
`;

export const MovieDetail: React.FC = () => {
  const { search } = useLocation();
  const [favoriteMovies, setFavMovies] = useRecoilState(loggedInMovieItem);
  const query = new URLSearchParams(search);
  const movieId = Number(query.get("movieId"));
  const allMovieData = useRecoilValue(movies);
  const targetMovie = allMovieData.find(movie => movie.id === movieId);
  const { backdrop_path, original_title, overview, popularity, title, release_date } = targetMovie;
  const favProp: FavoriteProps = {
    targetId: movieId,
    favorites: favoriteMovies,
    setFavorites: setFavMovies,
    targetItem: FavoriteItemType.Movie
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DetailContainer background={`https://image.tmdb.org/t/p/original${backdrop_path}`}>
      <FavoriteIconContainer>
        <FavoriteIcon {...favProp} />
      </FavoriteIconContainer>
      <TitleContainer>
        <Title>{title}</Title>
        <Subtitle>{original_title}</Subtitle>
      </TitleContainer>
      <OverviewContainer hasOverview={!!overview}>
        <Overview>{overview}</Overview>
      </OverviewContainer>
      <PopularityReleaseDateContainer>
        <Popularity>人気度: {popularity.toFixed(2)}</Popularity>
        <ReleaseDate>公開日: {release_date}</ReleaseDate>
      </PopularityReleaseDateContainer>
      <BackButton btnVal="映画リストへ戻る" />
    </DetailContainer>
  );
}