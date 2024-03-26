import React, { useState } from 'react';
import styled from 'styled-components';
import { InputField } from 'src/atoms/Input/BaseInputField';
import { BaseBtn } from 'src/atoms/Btn/BaseBtn';
import { SearchSet } from 'src/type/app';
import { searchStates } from 'RecoilAtom';
import { useRecoilState } from 'recoil';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
`;

const SearchButton = styled(BaseBtn)`
  padding: 10px 20px;
  margin-left: 10px;
`;

export const SearchBar: React.FC<SearchSet> = ({}) => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchStates);

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // ここで検索クエリを用いた検索処理を実行
  };

  return (
    <SearchBarContainer>
      <InputField
        type="text"
        placeholder="キーワードを入力..."
        value={searchQuery["characters"]} 
        onChange={(e) => setSearchQuery((prev) => ({
            ...prev,
            characters: e.target.value
        }))
    }
      />
      <SearchButton btnColor="#007bff" onClick={handleSearch}>検索</SearchButton>
    </SearchBarContainer>
  );
};
