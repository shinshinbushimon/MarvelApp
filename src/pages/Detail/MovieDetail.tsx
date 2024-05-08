import { movies } from "RecoilAtom";
import React from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { BackButton } from "src/atoms/Btn/BackButton";

const DetailContainer = styled.div<{ background: string }>`
  background-image: url(${props => props.background});
  background-size: contain;  // 画像全体がコンテナ内に収まるように調整
  background-position: top center;  // 画像の上部を中心に配置
  background-repeat: no-repeat;  // 画像の繰り返しを防ぐ
  color: white;
  padding: 20px;
  width: 100%;  // コンテナの幅を設定
  height: 100vh;  // コンテナの高さを画面の高さに設定
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
`;

const Overview = styled.p`
  font-size: 1.1rem;
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
    const query = new URLSearchParams(search);
    const movieId = Number(query.get("movieId"));
    console.log("movieId is ", movieId);
    const allMovieData = useRecoilValue(movies);
    const targetMovie = allMovieData.find(movie => movie.id === movieId);
    const { backdrop_path, original_title, overview, popularity, title, release_date} = targetMovie;
    
    return (
        <DetailContainer background={`https://image.tmdb.org/t/p/original${backdrop_path}`}>
            <Title>{title}</Title>
            <Subtitle>{original_title}</Subtitle>
            <Overview>{overview}</Overview>
            <div>
                <Popularity>人気度: {popularity.toFixed(2)}</Popularity>
                <ReleaseDate>公開日: {release_date}</ReleaseDate>
            </div>
            <BackButton />
        </DetailContainer>
    );


  
}