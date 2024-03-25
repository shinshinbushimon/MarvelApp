import React from "react";
import { ImageProps } from "src/type/app";
import styled from "styled-components";

// 丸い形にしたい
const SImage = styled.img`

`;
export const BaseImage: React.FC<ImageProps> = ({src, alt}) => (
    <img src={src} alt={alt} />
);

