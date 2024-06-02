import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// スタイル付きのボタンコンポーネント
const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

export const BackButton: React.FC<{btnVal: string}> = ({btnVal}) => {
  const navigate = useNavigate();

  // 一つ前のページに戻る関数
  const handleBack = () => {
    navigate(-1); // 一つ前のページに戻る
  };

  return (
    <StyledButton onClick={handleBack}>{btnVal}</StyledButton>
  );
};
