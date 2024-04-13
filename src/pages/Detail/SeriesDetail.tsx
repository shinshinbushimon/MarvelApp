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

export const SeriesDetail: React.FC<{index: number}> = ({index}) => {
    const AllData = useRecoilValue(AllScrollData);
    const resourceType = 'series';

    const seriesData = AllData[resourceType][index];
    const { title, description, startYear, endYear, rating, modified, thumbnail, characters, creators } = seriesData;

    // Generate the image URL
    const imageUrl = thumbnail ? `${thumbnail.path}.${thumbnail.extension}` : null;

    return (
        <DetailContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Info>Start Year: {startYear}</Info>
            <Info>End Year: {endYear}</Info>
            <Info>Rating: {rating}</Info>
            <Info>Last Modified: {new Date(modified).toLocaleDateString()}</Info>
            {imageUrl && <Thumbnail src={imageUrl} alt="Series Thumbnail" />}
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
        </DetailContainer>
    );
};
