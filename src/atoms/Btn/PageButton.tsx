import React from "react";
import styled from "styled-components";

interface pageBtn {
    children: string,
    onClick: () => void,
    disabled?: boolean
    
}

export const PageBtn: React.FC<pageBtn> = ({children, onClick, disabled}) => {
    return (
      <PageButton onClick={onClick} disabled={disabled}>
        {children}
      </PageButton>
    );
}

const PageButton = styled.button`
  padding: 8px 16px;
  margin: 0 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
  &:hover {
    background-color: #0056b3;
  }
`;