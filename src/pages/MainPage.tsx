// src/components/MainPage.js
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedNav } from 'RecoilAtom';
import { Navbar } from '../atoms/navbar/Navbar';
import { MovieInfo } from './MovieInfos';
import { CharacterDefault } from './CharacterDefault';
import { Favorite } from './Favorites';
import styled from 'styled-components';
import { CombinedFooter } from 'src/templates/footer/MarvelTMdbCombinedFooter';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
`;

export const MainPage = () => {
  const selected = useRecoilValue(selectedNav);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        {selected === 'movies' && <MovieInfo />}
        {selected === 'characters' && <CharacterDefault />}
        {selected === 'favorites' && <Favorite />}
      </ContentContainer>
      <CombinedFooter />
    </PageContainer>
  );
};