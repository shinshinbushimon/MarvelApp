import { useGetFavorites } from 'customHooks';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FavChars, FavMovies, loggedInItem, loggedInMovieItem, userId } from 'RecoilAtom'; // Recoilアトムのインポート
import { CustomLink } from 'src/atoms/Link/BaseLink';
import { CharacterItem, MovieItem } from 'src/molecules/CharacterItem';
import styled from 'styled-components';

export const Favorite = () => {
    const [loading, setLoading] = useState(true);
    const favorites = useRecoilValue(loggedInItem);
    const movieFavs = useRecoilValue(loggedInMovieItem);
    const getFavs = useGetFavorites(favorites, movieFavs);
    const username = useRecoilValue(userId);

    useEffect(() => {
        const fetchData = async () => {
            await getFavs();
            setLoading(false);
        };
        fetchData();
    }, [getFavs]);

    const charFavsData = useRecoilValue(FavChars);
    const movieFavsData = useRecoilValue(FavMovies);

    if (loading) {
        return <p>データを取得しています...</p>;
    }

    return (
        <Container>
            <Section>
                <Title>{ username }さんのお気に入り映画情報</Title>
                {movieFavsData && movieFavsData.length > 0 ? (
                    <ItemList>
                        {movieFavsData.map(movieInfo => (
                            <Item key={movieInfo.id}>
                                <CustomLink to={`/movie/detail/?movieId=${movieInfo.id}`}>
                                    <MovieItem {...movieInfo} />
                                </CustomLink>
                            </Item>
                        ))}
                    </ItemList>
                ) : (
                    <p>お気に入り映画情報が存在しません</p>
                )}
            </Section>
            <Section>
                <Title>{ username }さんのお気に入りキャラクタ―</Title>
                {charFavsData && charFavsData.length > 0 ? (
                    <ItemList>
                        {charFavsData.map(character => (
                            <Item key={character.id}>
                                <CustomLink to={`/character/detail/?characterId=${character.id}`}>
                                    <CharacterItem {...character} />
                                </CustomLink>
                            </Item>
                        ))}
                    </ItemList>
                ) : (
                    <p>お気に入りのキャラクターが存在しません</p>
                )}
            </Section>
        </Container>
    );
};

// スタイリング
const Container = styled.div`
  padding: 20px;
`;

const Section = styled.section`
  margin-bottom: 40px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ItemList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Item = styled.li`
  list-style: none;
  flex: 1 1 calc(33.333% - 20px); 
  max-width: calc(33.333% - 20px);
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

