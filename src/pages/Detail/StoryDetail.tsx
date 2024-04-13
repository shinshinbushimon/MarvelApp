import { AllScrollData } from "RecoilAtom";
import React from "react";
import styled from 'styled-components';
import { useRecoilValue } from "recoil";
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

export const StoryDetail: React.FC<{index: number}> = ({index}) => {
    const { stories } = useRecoilValue(AllScrollData);
    const { title, description, type, modified, thumbnail, characters, creators, originalissue } = stories[index];

    // 画像URLの生成
    const imageUrl = thumbnail ? createImg(thumbnail) : null;

    return (
        <DetailContainer>
            <Title>{title}</Title>
            {description && <Description>{description}</Description>}
            <Info>Type: {type}</Info>
            <Info>Modified: {new Date(modified).toLocaleDateString()}</Info>
            {imageUrl && <Thumbnail src={imageUrl} alt="Story Thumbnail" />}
            <h2>Characters</h2>
            <List>
                {characters.items.map((character, index) => (
                <ListItem key={index}>{character.name}</ListItem>
                ))}
            </List>
            <h2>Creators</h2>
            <List>
                {creators.items.map((creator, index) => (
                <ListItem key={index}>{creator.name}</ListItem>
                ))}
            </List>
            {originalissue && <Info>Original Issue: {originalissue.name}</Info>}
        </DetailContainer>
    );
};