import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #202020;
  color: #ffffff;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
`;

const FooterLogo = styled.img`
  height: 30px;
  margin: 0 5px;
`;

const FooterText = styled.p`
  margin: 10px 0;
`;

export const TMDbFooter: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>This product uses the TMDb API but is not endorsed or certified by TMDb.</FooterText>
      <FooterLogo src="https://www.themoviedb.org/assets/2/v4/logos/stacked-blue-d1a2fa16d0280d74048db3f37bf39af1ae2f2a4a89fc205f15a878a7ad6f3b96.svg" alt="TMDb Logo" />
    </FooterContainer>
  );
};

export const MarvelFooter: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>Data provided by Marvel. © 2024 MARVEL</FooterText>
      <FooterLogo src="https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg" alt="Marvel Logo" />
    </FooterContainer>
  );
};

// Combined Footer
export const CombinedFooter: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>This product uses the TMDb API but is not endorsed or certified by TMDb.</FooterText>
      
      <FooterText>Data provided by Marvel. © 2024 MARVEL</FooterText>
    </FooterContainer>
  );
};