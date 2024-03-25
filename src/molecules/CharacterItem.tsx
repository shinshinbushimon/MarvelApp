import React from "react";
import { Label } from "src/atoms/Label/BaseLabel";
import { BaseImage } from "src/atoms/Img/BaseImg";
import { CustomLink } from "src/atoms/Link/BaseLink";
import { Character } from "src/type/Character";
import { Image } from "src/type/Common";
import styled from "styled-components";

const SCharacterItem = styled.div`
    diplay: flex;
    justiy-content: center;
    align-items: center;
    flex-direction: column;
`;

const createImg = (img: Image) => {
    return img.path + '.' + img.extension
}

export const CharacterItem: React.FC<Character> = ({
  id, // キャラクターリソースの一意のID
  name, // キャラクターの名前
  description, // キャラクターの短い説明または伝記
  modified, // リソースが最後に変更された日付
  resourceURI, // このリソースの正規URL識別子
  urls, // リソースの公開WebサイトURLのセット
  thumbnail, // このキャラクターの代表画像
  comics, // このキャラクターを特集するコミックのリソースリスト
  stories, // このキャラクターが登場するストーリーのリソースリスト
  events, // このキャラクターが登場するイベントのリソースリスト
  series, // このキャラクターが登場するシリーズのリソースリスト

}) => {
    
    return (
        <SCharacterItem>
            <BaseImage src={createImg(thumbnail)} alt="Marvel Char" />
            <p>id: {id}</p>
            <p>name: {name}</p>
            <Label title="description: " />
            <p>{description}</p>
            <p>modefied: {modified.toString()}</p>

        </SCharacterItem>
    );
};