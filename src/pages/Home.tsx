import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const NavButton = styled(Link)`
  margin: 10px;
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchBar = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 50%;
  border: 2px solid #007bff;
  border-radius: 5px;
`;

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <HomePageContainer>
      <SearchBar
        type="text"
        placeholder="Search characters, comics, events..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <NavButton to="/character">Characters</NavButton>
    </HomePageContainer>
  );
};
