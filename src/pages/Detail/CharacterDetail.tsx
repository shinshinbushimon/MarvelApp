import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { targetCharacterId, targetCharacter, loggedInItem } from "RecoilAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { InfinityScroll } from "src/organisms/Scroll/InfinityScroll";
import { useDetailSearch, useTranslationHandler } from "customHooks";
import { FavoriteIcon } from "src/atoms/Icon/BaseIcon";
import { BackButton } from "src/atoms/Btn/BackButton";
import { FavoriteProps } from "src/type/app";
import { FavoriteItemType } from "src/type/enum";

export const CharacterDetail: React.FC = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const characterId = Number(query.get("characterId"));
  const [favoriteChar, setFavoriteChar] = useRecoilState(loggedInItem);
  const setId = useSetRecoilState(targetCharacterId);
  setId(characterId);
  const isLoading = useDetailSearch();
  const mainData = useRecoilValue(targetCharacter);

  const { monitoredDescription, translatedDescription } = useTranslationHandler(mainData?.description || '');

  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  if (isLoading || !mainData) {
    return <div>データを取得しています...</div>;
  }

  const { thumbnail, name, modified } = mainData;

  const favProp: FavoriteProps = {
    targetId: characterId,
    favorites: favoriteChar,
    setFavorites: setFavoriteChar,
    targetItem: FavoriteItemType.Character
  };

  

  return (
    <Container>
      <FavoriteIcon {...favProp} />
      <ImageContainer>
        <CharacterImage src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        <ModifiedDate>最終更新日: {modified.toString()}</ModifiedDate>
      </ImageContainer>
      <DetailContainer>
        <CharacterName>{name}</CharacterName>
        <CharacterDescription>{translatedDescription || monitoredDescription}</CharacterDescription>
        <ScrollSections>
          <ItemDataContainer>
            <p>コミックス:</p>
            <StyledInfinityScrollContainer>
              <InfinityScroll dataType="comics" />
            </StyledInfinityScrollContainer>
          </ItemDataContainer>
          <ItemDataContainer>
            <p>イベント:</p>
            <StyledInfinityScrollContainer>
              <InfinityScroll dataType="events" />
            </StyledInfinityScrollContainer>
          </ItemDataContainer>
          <ItemDataContainer>
            <p>シリーズ:</p>
            <StyledInfinityScrollContainer>
              <InfinityScroll dataType="series" />
            </StyledInfinityScrollContainer>
          </ItemDataContainer>
        </ScrollSections>
        <BackButton btnVal="キャラクターリストへ戻る" />
      </DetailContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const CharacterImage = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
`;

const ModifiedDate = styled.p`
  text-align: center;
  margin-top: 10px;
`;

const DetailContainer = styled.div`
  margin-left: 20px;
`;

const CharacterName = styled.h1``;

const CharacterDescription = styled.p``;

const ScrollSections = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ItemDataContainer = styled.div`
  margin-top: 10px;
`;

const StyledInfinityScrollContainer = styled.div`
  border: 1px solid black;
  padding: 10px;
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 10px;
  background-color: white;  
  border-radius: 10px;  
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
`;
