import { AllScrollData } from "RecoilAtom";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from 'styled-components';
import { createImg, useTranslationHandler } from "customHooks";
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

const Thumbnail = styled.img`
    display: block;
    width: 100px; 
    height: auto; 
    margin: 20px auto;
    border-radius: 4px;
`;

const Info = styled.p`
  margin-top: 10px;
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 5px;
`;

export const ComicsDetail: React.FC = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const index = Number(query.get("index"));

    const AllData = useRecoilValue(AllScrollData);
    const resourceType = 'comics';

    const comicData = AllData[resourceType][index];
    const { title, thumbnail, prices, characters, description } = comicData;
    const { monitoredDescription, translatedDescription } = useTranslationHandler(description);

    const imageUrl = createImg(thumbnail);
    const printPrice = prices.find(price => price.type === 'printPrice')?.price || 0;
    const digitalPrice = prices.find(price => price.type === 'digitalPurchasePrice')?.price || 0;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <DetailContainer>
            <Title>{title}</Title>
            <p>{translatedDescription || monitoredDescription}</p>
            <Info>通常価格: ${printPrice}</Info>
            <Info>デジタル価格: ${digitalPrice}</Info>
            {imageUrl && <Thumbnail src={imageUrl} alt="Comic Thumbnail" />}
            <SectionTitle>登場キャラクター</SectionTitle>
            <List>
                {characters.items.map((character, index) => (
                    <ListItem key={index}>{character.name}</ListItem>
                ))}
            </List>
            <BackButton btnVal="キャラクター画面へ戻る" />
        </DetailContainer>
    );
};
