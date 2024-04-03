import React from "react";
import { Label } from "src/atoms/Label/BaseLabel";
import { BaseImage } from "src/atoms/Img/BaseImg";
import { CustomLink } from "src/atoms/Link/BaseLink";
import { Character } from "src/type/Character";
import { Image } from "src/type/Common";
import styled from "styled-components";
import { createImg } from "customHooks";



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
            <ImageContainer>
                <BaseImage src={createImg(thumbnail)} alt="Marvel Char" />
            </ImageContainer>
            
            <p>id: {id}</p>
            <p>name: {name}</p>
            <Label title="description: " />
            <Description>{description}</Description>
            <p>modefied: {modified.toString()}</p>

        </SCharacterItem>
    );
};

const SCharacterItem = styled.div`
  flex: 1 0 20%; /* flex-grow, flex-shrink, flex-basis */
  margin: 10px; /* アイテム間のマージン */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 箱影 */
  border-radius: 8px; /* 角丸 */
  overflow: hidden; /* 内容がはみ出したら隠す */
  max-width: 220px; /* 最大幅を制限してアイテムが大きくなりすぎないようにする */

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* ホバー時の箱影 */
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; /* コンテナの幅を指定 */
`;

const Description = styled.p`
  width: 90%; /* 要素の幅を指定 */
  overflow: hidden; /* 内容がはみ出たら非表示にする */
  white-space: nowrap; /* テキストを1行にする */
  text-overflow: ellipsis; /* 内容がオーバーフローしたら省略記号を表示 */
  margin: 10px 0; /* 上下のマージンを設定 */
`;

