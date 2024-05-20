import { useGetFavorites } from 'customHooks';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { FavChars, FavMovies, loggedInItem, loggedInMovieItem } from 'RecoilAtom'; // Recoilアトムのインポート
import { CustomLink } from 'src/atoms/Link/BaseLink';
import { CharacterItem, MovieItem } from 'src/molecules/CharacterItem';

export const Favorite = () => {
    const [loading, setLoading] = useState(true);
    const favorites = useRecoilValue(loggedInItem);
    const movieFavs = useRecoilValue(loggedInMovieItem);
    const getFavs = useGetFavorites(favorites, movieFavs);
    useEffect(() => {
        const fetchData = async () => {
            await getFavs();
            setLoading(false);
        };
        fetchData();
    }, []);

    const charFavsData = useRecoilValue(FavChars);
    const movieFavsData = useRecoilValue(FavMovies);
    if (loading) {
        return <p>データを取得しています...</p>;
    }

    return (
        <div>
            <section>
                <h2>お気に入り映画情報</h2>
                {movieFavsData && movieFavsData.length > 0 ? (
                    <ul>
                        {movieFavsData.map(movieInfo => (
                            <li key={movieInfo.id}>
                                <CustomLink to={`/movie/detail/?movieId=${movieInfo.id}`}>
                                    <MovieItem {...movieInfo} />
                                </CustomLink>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>お気に入り映画情報が存在しません</p>
                )}
            </section>
            <section>
                <h2>あなたのお気に入りキャラクタ―</h2>
                {charFavsData && charFavsData.length > 0 ? (
                    <ul>
                        {charFavsData.map(character => (
                            <li key={character.id}>
                                <CustomLink to={`/character/detail/?characterId=${character.id}`}>
                                    <CharacterItem {...character} />
                                </CustomLink>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>お気にいりのキャラクターが存在しません</p>
                )}
            </section>
        </div>
    );
};