import React, { useState } from 'react';
import styled from 'styled-components';
import { InputField } from 'src/atoms/Input/BaseInputField';
import { BaseBtn } from 'src/atoms/Btn/BaseBtn';
import { SearchSet } from 'src/type/app';
import { searchValue } from 'RecoilAtom';
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

// 外から値をもらうものでは？
export const SearchBar: React.FC<SearchSet> = ({value, onChange}) => {

  return (
    <SearchBarContainer>
      <InputField
        type="text"
        placeholder="キーワードを入力..."
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        
      />
    </SearchBarContainer>
  );
};
