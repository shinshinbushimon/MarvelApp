import { AllScrollData } from "RecoilAtom";
import React, { useEffect } from "react";
import styled from 'styled-components';
import { useRecoilValue } from "recoil";
import { useTranslationHandler } from "customHooks";
import { useLocation } from "react-router-dom";
import { BackButton } from "src/atoms/Btn/BackButton";

const DetailContainer = styled.div`
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
`;

const Title = styled.h1`
    color: #333;
    text-align: center;
`;

const Description = styled.p`
    color: #666;
`;

const Thumbnail = styled.img`
    display: block;
    max-width: 200px;
    height: auto;
    margin: 20px auto;
    border-radius: 4px;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
    max-height: 150px;
    overflow-y: auto;
`;

const ListItem = styled.li`
    margin: 10px 0;
    color: #666;
`;

const Info = styled.div`
    margin: 10px 0;
    color: #0077cc;
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
`;

export const SeriesDetail: React.FC = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const index = Number(query.get("index"));
    const AllData = useRecoilValue(AllScrollData);
    const resourceType = 'series';

    const seriesData = AllData[resourceType][index];
    const { title, description, startYear, endYear, rating, modified, thumbnail, characters, creators } = seriesData;
    const { monitoredDescription, translatedDescription } = useTranslationHandler(description);
    // Generate the image URL
    const imageUrl = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <DetailContainer>
            <Title>{title}</Title>
            <Description>{translatedDescription || monitoredDescription}</Description>
            <Info>開始年: {startYear}</Info>
            <Info>終了年: {endYear}</Info>
            <Info>評価: {rating}</Info>
            <Info>最終更新日: {new Date(modified).toLocaleDateString()}</Info>
            {imageUrl && <Thumbnail src={imageUrl} alt="シリーズのサムネイル" />}
            <SectionTitle>キャラクター</SectionTitle>
            <List>
                {characters.items.map((character, index) => (
                    <ListItem key={index}>{character.name}</ListItem>
                ))}
            </List>
            <SectionTitle>クリエイター</SectionTitle>
            <List>
                {creators.items.map((creator, index) => (
                    <ListItem key={index}>{creator.name}</ListItem>
                ))}
            </List>
            <BackButton btnVal="キャラクター画面へ戻る"/>
        </DetailContainer>
      );
    
};
