import React, { useState } from 'react';
import styled from 'styled-components';
import { InputField } from 'src/atoms/Input/BaseInputField';
import { BaseBtn } from 'src/atoms/Btn/BaseBtn';
import { SearchSet } from 'src/type/app';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff; /* 白背景 */
  padding: 10px;
  border-radius: 25px; /* 丸みを帯びた端 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* ソフトシャドウを追加 */
  border: 1px solid #ddd; /* 細めのボーダーで洗練された見た目に */
`;

const SearchButton = styled(BaseBtn)`
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 15px; /* ボタンの端を丸く */
  font-weight: bold; /* フォントを太く */
`;

export const SearchBar: React.FC<SearchSet> = ({ value, onChange, placeholder }) => {
  const [searchState, setSearchState] = useState<boolean>(false);

  return (
    <SearchBarContainer>
      {searchState && (
        <InputField
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
      <SearchButton 
        btnColor='' 
        onClick={() => setSearchState(currentState => !currentState)}
      >
        🔍
      </SearchButton>
    </SearchBarContainer>
  );
};