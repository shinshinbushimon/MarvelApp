import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { selectedNav } from 'RecoilAtom'; // 適切なパスを設定してください

const NavbarContainer = styled.div`
  display: flex;
  background-color: lightgray;
  padding: 10px;
`;

const NavButton = styled.button<{isActive: boolean}>`
  padding: 10px 20px;
  border: none;
  background-color: ${props => props.isActive ? 'blue' : 'transparent'};
  color: ${props => props.isActive ? 'white' : 'black'};
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: ${props => props.isActive ? 'darkblue' : 'gray'};
  }
`;

export const Navbar = () => {
  const [selected, setSelected] = useRecoilState(selectedNav);

  const handleSelect = (navItem) => {
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
