import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { MarvelApi } from "RecoilAtom";
import { useRecoilValue } from "recoil";
import { BaseBtn } from "src/atoms/Btn/BaseBtn";
import { currentPage } from "RecoilAtom";


export const CharacterDetail: React.FC = () => {
    const apiData = useRecoilValue(MarvelApi);
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const pageData = useRecoilValue(currentPage);
    const characterId = query.get("characterId");

    const mainData = apiData[pageData].find(character => character.id.toString() === characterId);
    console.log(mainData);
    const { thumbnail, name, modified, description, resourceURI, urls } = mainData;
    let nav = useNavigate();
    const backBtn = () => nav('/character');

    console.log("queryObjは、", query);
    return (

        <Container>
          <ImageContainer>
              <CharacterImage src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
              <ModifiedDate>Last Modified: {modified.toString()}</ModifiedDate>
          </ImageContainer>
          <DetailContainer>
              <CharacterName>{name}</CharacterName>
              <CharacterDescription>{description}</CharacterDescription>
              <MoreDetails href={resourceURI} target="_blank" rel="noopener noreferrer">More Details</MoreDetails>
              <UrlsContainer>
                {urls.map((url, index) => (
                    <UrlLink key={index} href={url.url} target="_blank" rel="noopener noreferrer">{url.type}</UrlLink>
                ))}
              </UrlsContainer>
              <BaseBtn btnColor="blue" onClick={backBtn}>リストへ戻る</BaseBtn>
          </DetailContainer>
        </Container>
  );
};

export default CharacterDetail;

const Container = styled.div`
  display: flex;
  margin: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const CharacterImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`;

const ModifiedDate = styled.p`
  text-align: center;
  margin-top: 10px;
`;

const DetailContainer = styled.div`
  flex: 2;
  margin-left: 20px;
`;

const CharacterName = styled.h1``;

const CharacterDescription = styled.p``;

const MoreDetails = styled.a`
  display: block;
  margin-top: 10px;
`;

const UrlsContainer = styled.div`
  margin-top: 10px;
`;

const UrlLink = styled.a`
  display: inline-block;
  margin-right: 10px;
`;