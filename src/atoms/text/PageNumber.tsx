import React from "react";
import styled from "styled-components";

export const PageNumber: React.FC<{pageContent: string}> = ({pageContent}) => {
    return <PageNation>{pageContent}</PageNation>
}

const PageNation = styled.span`
  font-size: 16px;
  color: #333;
`;