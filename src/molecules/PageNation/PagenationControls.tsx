import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentPage, totalDataCountState } from 'RecoilAtom'; // 仮定のcurrentPageアトム
import { useInitialNumberOfData } from 'customHooks';

export const BasicPagination: React.FC = () =>  {
  useInitialNumberOfData(); // 一度だけ実行
  const [page, setPage] = useRecoilState(currentPage); // currentPageのRecoilステート
  const totalDataCount = useRecoilValue(totalDataCountState);
  const pageLimit = 20; // 一度に取得するデータ数

  const handleChange = (event, value) => {
    setPage(value);
    // ここでAPIを呼び出してデータを取得するか、ページが変わるたびにデータを取得するカスタムフックをトリガーする
  };

  if (totalDataCount === undefined) {
    // データがまだ取得されていない場合はローディング表示をするなどの処理
    return <div>Loading...</div>;
  }
  const totalPage = Math.ceil(totalDataCount / pageLimit);

  return (
    <Stack spacing={2}>
      <Pagination count={totalPage} page={page} onChange={handleChange} />
      {/* 他のバリエーションを必要としない場合は、削除可能 */}
    </Stack>
  );
}
