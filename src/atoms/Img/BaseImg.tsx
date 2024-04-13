import React from "react";
import { ImageProps } from "src/type/app";
import styled from "styled-components";

export const BaseImage: React.FC<ImageProps> = ({src, alt}) => (
    <RoundImage src={src} alt={alt} />
);

const RoundImage = styled.img`
  max-width: 100%; /* 最大幅を100%にする */
  max-height: 100%; /* 最大高さも100%にする */
  object-fit: contain; /* 画像がコンテナに収まるようにする */
  border-radius: 50%; /* 円形にする */
`;
