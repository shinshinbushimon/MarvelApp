import React from "react";
import { BaseImage } from "src/atoms/Img/BaseImg";
import { Character } from "src/type/Character";
import { MovieData } from "src/type/app";
import styled from "styled-components";
import { createImg, getMoviePoster } from "customHooks";



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

export const MovieItem: React.FC<MovieData> = 
  ({ 
    poster_path,
    title,
  }) => {
  return (

      <SCharacterItem>
          <ImageContainer>
              <BaseImage src={getMoviePoster(poster_path)} alt={title} />
          </ImageContainer>
          <NameContainer>{title}</NameContainer>
      </SCharacterItem>
  );
};

const SCharacterItem = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  flex: 1 0 20%; 
  margin: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  border-radius: 8px; 
  overflow: hidden; 
  max-width: 200px;
  height: 280px;

  background: linear-gradient(145deg, #fafafa, #eaeaea); 
  border: 1px solid #ddd; 
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out; 

  &:hover {
    transform: scale(1.05); 
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  }
`;

const ImageContainer = styled.div`
  width: 100%; 
  height: 70%; 
  border-radius: 50%; 
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%; 
    height: auto; 
    object-fit: cover; 
  }
`;

const NameContainer = styled.div`
  width: 100%; 
  height: 50px; 
  display: flex;
  align-items: center; 
  justify-content: center;
  font-size: 1.2em; 
  font-weight: bold; 
  color: #333; 
  padding: 10px; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  white-space: normal; 
  text-align: center;
  line-height: 1.5; 
  font-family: 'Open Sans', sans-serif;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

