import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();

  // 一つ前のページに戻る関数
  const handleBack = () => {
    navigate(-1); // 一つ前のページに戻る
  };

  return (
    <button onClick={handleBack}>リストへ戻る</button>
  );
};

