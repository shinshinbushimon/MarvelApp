// src/components/MainPage.js
import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedNav } from 'RecoilAtom';
import { Navbar } from '../atoms/navbar/Navbar';
import { MovieInfo } from './MovieInfos';
import { CharacterDefault } from './CharacterDefault';
import { Favorite } from './Favorites';

export const MainPage = () => {
  const selected = useRecoilValue(selectedNav);

  return (
    <div>
      <Navbar />
      {selected === 'movies' && <MovieInfo />}
      {selected === 'characters' && <CharacterDefault />}
      {selected === 'favorites' && <Favorite />}
    </div>
  );
};
