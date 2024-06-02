import { AllScrollData } from "RecoilAtom";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from 'styled-components';
import { createImg, useTranslate, useTranslationHandler } from "customHooks";
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

const SectionTitle = styled.h2`
  margin-top: 20px;
`;

export const EventDetail: React.FC = () => {
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const index = Number(query.get("index"));
    const resourceType = 'events';
    const AllData  = useRecoilValue(AllScrollData);
    const eventData = AllData[resourceType][index];

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
    const { monitoredDescription, translatedDescription } = useTranslationHandler(description);

    const imageUrl = thumbnail ? createImg(thumbnail) : null;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <DetailContainer>
            <Title>{title}</Title>
            <Description>{translatedDescription || monitoredDescription}</Description>
            <DateInfo>最終更新日: {new Date(modified).toLocaleDateString()}</DateInfo>
            <DateInfo>開始日: {new Date(start).toLocaleDateString()}</DateInfo>
            <DateInfo>終了日: {new Date(end).toLocaleDateString()}</DateInfo>
            {imageUrl && <Thumbnail src={imageUrl} alt="イベントのサムネイル" />}
            <SectionTitle>シリーズ</SectionTitle>
            <List>
                {series.items.map((item, index) => (
                    <ListItem key={index}>{item.name}</ListItem>
                ))}
            </List>
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
            <DateInfo>次のイベント: {next ? next.name : "N/A"}</DateInfo>
            <DateInfo>前のイベント: {previous ? previous.name : "N/A"}</DateInfo>
            <BackButton btnVal="キャラクター画面へ戻る"/>
        </DetailContainer>
    );
};
