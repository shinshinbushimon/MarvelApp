import React from "react";
import { ImageProps } from "src/type/app";
import styled from "styled-components";

export const BaseImage: React.FC<ImageProps> = ({src, alt}) => (
    <RoundImage src={src} alt={alt} />
);

const RoundImage = styled.img`
  width: 100px; /* 画像のサイズを指定 */
  height: 100px; /* 画像のサイズを指定 */
  border-radius: 50%; /* 丸くする */
  object-fit: cover; /* 画像の比率を保ちつつ、指定した領域に合わせる */
`;
