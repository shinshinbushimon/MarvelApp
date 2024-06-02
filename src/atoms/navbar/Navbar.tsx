import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { selectedNav } from 'RecoilAtom'; // 適切なパスを設定してください

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-around; /* 中央揃え */
  background-color: #333;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const NavButton = styled.button<{isActive: boolean}>`
  padding: 10px 20px;
  border: none;
  background-color: ${props => props.isActive ? '#007BFF' : 'transparent'};
  color: ${props => props.isActive ? 'white' : '#ddd'};
  cursor: pointer;
  margin-right: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: ${props => props.isActive ? '#0056b3' : '#444'};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const Navbar = () => {
  const [selected, setSelected] = useRecoilState(selectedNav);

  const handleSelect = (navItem: string) => {
    setSelected(navItem);
  };

  return (
    <NavbarContainer>
      <NavButton isActive={selected === 'movies'} onClick={() => handleSelect('movies')}>
        映画
      </NavButton>
      <NavButton isActive={selected === 'characters'} onClick={() => handleSelect('characters')}>
        キャラクター
      </NavButton>
      <NavButton isActive={selected === 'favorites'} onClick={() => handleSelect('favorites')}>
        お気に入り
      </NavButton>
    </NavbarContainer>
  );
};