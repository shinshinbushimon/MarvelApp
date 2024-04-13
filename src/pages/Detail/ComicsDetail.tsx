import { AllScrollData } from "RecoilAtom";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from 'styled-components';
import { createImg } from "customHooks";

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

const CharacterList = styled.ul`
    list-style: none;
    padding: 0;
    max-height: 200px; // 一定の高さを超えたらスクロール
    overflow-y: auto; // 縦方向にスクロールバーを表示
`;

const CharacterItem = styled.li`
    margin: 10px 0;
    color: #666;
`;

const Thumbnail = styled.img`
    display: block;
    width: 100px; // サムネイルの幅を小さく設定
    height: auto; // 高さは自動調整
    margin: 20px auto;
    border-radius: 4px;
`;

const PriceInfo = styled.p`
    color: #0077cc;
    font-weight: bold;
    margin: 5px 0;
`;

export const ComicsDetail: React.FC<{index: number}> = ({ index }) => {
    const AllData = useRecoilValue(AllScrollData);
    const resourceType = 'comics';

    const comicData = AllData[resourceType][index];
    const { title, thumbnail, prices, characters } = comicData; 

    const imageUrl = createImg(thumbnail);
    const printPrice = prices.find(price => price.type === 'printPrice')?.price || 0;
    const digitalPrice = prices.find(price => price.type === 'digitalPurchasePrice')?.price || 0;

    return (
        <DetailContainer>
            <Title>{title}</Title>
            <h2>登場キャラクター</h2>
            <CharacterList>
                {characters.items.map((character, index) => (
                    <CharacterItem key={index}>{character.name}</CharacterItem>
                ))}
            </CharacterList>
            <h2>サムネイル</h2>
            <Thumbnail src={imageUrl} alt="Comic Thumbnail" />
            <h2>価格情報</h2>
            <PriceInfo>通常価格: ${printPrice}</PriceInfo>
            <PriceInfo>デジタル価格: ${digitalPrice}</PriceInfo>
        </DetailContainer>
    );
};