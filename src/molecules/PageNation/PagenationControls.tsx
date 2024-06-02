import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPage, totalDataCountState } from 'RecoilAtom';
import { useInitialNumberOfData } from 'customHooks';

export const BasicPagination: React.FC = () => {
  useInitialNumberOfData(); 
  const [page, setPage] = useRecoilState(currentPage); 
  const totalDataCount = useRecoilValue(totalDataCountState);
  const pageLimit = 20; 

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (totalDataCount === undefined) {
    return <div>Loading...</div>;
  }
  const totalPage = Math.ceil(totalDataCount / pageLimit);

  return (
    <StyledStack spacing={2}>
      <StyledPagination count={totalPage} page={page} onChange={handleChange} />
    </StyledStack>
  );
}

import styled from 'styled-components';

const StyledStack = styled(Stack)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledPagination = styled(Pagination)`
  .MuiPagination-ul {
    justify-content: center;
    li {
      margin: 0 5px;
    }
    .Mui-selected {
      background-color: #007bff;
      color: white;
      &:hover {
        background-color: #0056b3;
      }
    }
    button {
      border-radius: 50%;
      &:hover {
        background-color: #e0e0e0;
      }
    }
  }
`;