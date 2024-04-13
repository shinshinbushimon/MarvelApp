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

const Description = styled.p`
    color: #666;
`;

const DateInfo = styled.div`
    margin: 10px 0;
    color: #0077cc;
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

export const EventDetail: React.FC<{index: number}> = ({ index }) => {
    const resourceType = 'events'
    const AllData  = useRecoilValue(AllScrollData);
    const eventData = AllData[resourceType][index]
    
    const {
        title,
        description,
        modified,
        start,
        end,
        thumbnail,
        series,
        characters,
        creators,
        next,
        previous
    } = eventData;

    // 画像URLの生成
    const imageUrl = thumbnail ? createImg(thumbnail) : null;

    return (
        <DetailContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
            <DateInfo>Modified: {new Date(modified).toLocaleDateString()}</DateInfo>
            <DateInfo>Start: {new Date(start).toLocaleDateString()}</DateInfo>
            <DateInfo>End: {new Date(end).toLocaleDateString()}</DateInfo>
            {imageUrl && <Thumbnail src={imageUrl} alt="Event Thumbnail" />}
            <h2>Series</h2>
            <List>
                {series.items.map((item, index) => (
                    <ListItem key={index}>{item.name}</ListItem>
                ))}
            </List>
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
            <DateInfo>Next Event: {next ? next.name : "N/A"}</DateInfo>
            <DateInfo>Previous Event: {previous ? previous.name : "N/A"}</DateInfo>
        </DetailContainer>
    );
};