import React from "react";
import { Label } from "src/atoms/Label/BaseLabel";
import { BaseImage } from "src/atoms/Img/BaseImg";
import { CustomLink } from "src/atoms/Link/BaseLink";
import { Character } from "src/type/Character";
import { Image } from "src/type/Common";
import styled from "styled-components";
import { createImg } from "customHooks";



export const CharacterItem: React.FC<Character> = ({ name, thumbnail }) => {
  return (
      <SCharacterItem>
          <ImageContainer>
              <BaseImage src={createImg(thumbnail)} alt={name} />
          </ImageContainer>
          <NameContainer>{name}</NameContainer>
      </SCharacterItem>
  );
};

const SCharacterItem = styled.div`
  display: flex;
  flex-direction: column; /* 子要素を縦方向に並べる */
  align-items: center; /* 子要素を中央揃え */
  justify-content: center; /* 子要素を中央揃え */
  flex: 1 0 20%; /* flex-grow, flex-shrink, flex-basis */
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 箱影 */
  border-radius: 8px; /* 角丸 */
  overflow: hidden; /* 内容がはみ出したら隠す */
  max-width: 200px; /* 最大幅を制限 */
  height: 280px;

  background: linear-gradient(145deg, #fafafa, #eaeaea); /* グラデーション背景 */
  border: 1px solid #ddd; /* 細いボーダーを追加 */
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; /* スムーズなアニメーションのためのトランジションを追加 */

  &:hover {
    transform: scale(1.05); /* ホバー時に少し拡大 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* ホバー時の箱影を強調 */
  }
`;

const ImageContainer = styled.div`
  width: 100%; /* コンテナの幅を指定 */
  height: 70%; /* 画像コンテナの高さを指定 */
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%; /* 画像の幅をコンテナに合わせる */
    height: auto; /* 画像の高さを自動調整してアスペクト比を維持する */
    object-fit: cover; /* 画像がコンテナに収まるように調整 */
  }
`;

const NameContainer = styled.div`
  width: 100%; /* 名前コンテナの幅を指定 */
  height: 50px; /* 名前の高さを固定してテキストの折り返しを可能にする */
  display: flex;
  align-items: center; /* 子要素を中央揃え */
  justify-content: center; /* 子要素を中央揃え */
  font-size: 1.2em; /* フォントサイズを大きくする */
  font-weight: bold; /* フォントを太字にする */
  color: #333; /* 文字色をダークにする */
  padding: 10px; /* パディングを調整 */
  overflow: hidden; /* 内容がはみ出したら非表示にする */
  text-overflow: ellipsis; /* 内容がオーバーフローしたら省略記号を表示 */
  white-space: normal; /* テキストを複数行に対応させる */
  text-align: center; /* テキストを中央揃え */
  line-height: 1.5; /* 行間を調整 */
  font-family: 'Open Sans', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

