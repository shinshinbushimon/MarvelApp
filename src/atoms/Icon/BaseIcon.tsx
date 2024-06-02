// お気に入り機能で使用
// お気に入り機能で使用
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { loggedInItem, userId } from 'RecoilAtom';
import { addToFavorites, removeFromFavorites } from 'customHooks'; // API関数のダミー
import { FavoriteProps } from 'src/type/app';
import styled from 'styled-components';

export const FavoriteIcon: React.FC<FavoriteProps> = ({ 
  targetId,
  favorites,
  setFavorites,
  targetItem
}) => {
  const [isFavorited, setIsFavorited] = useState(favorites.includes(targetId));
  const userIdNumber = useRecoilValue(userId);

  useEffect(() => {
    setIsFavorited(favorites.includes(targetId));
  }, [favorites, targetId]);

  const toggleFavorite = async () => {
    let newFavorites;
    if (!isFavorited) {
      newFavorites = [...favorites, targetId];
      setIsFavorited(true);
      setFavorites(newFavorites);
      await addToFavorites(userIdNumber, targetId, targetItem); // DBに追加
    } else {
      newFavorites = favorites.filter(id => id !== targetId);
      setIsFavorited(false);
      setFavorites(newFavorites);
      await removeFromFavorites(userIdNumber, targetId, targetItem); // DBから削除
    }
  };

  return (
    <IconContainer onClick={toggleFavorite}>
      {isFavorited ? <AiFillStar color="yellow" size={40}/> : <AiOutlineStar size={40}/>}
    </IconContainer>
  );
};

const IconContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  font-size: 40px; // アイコンのサイズを設定
`;
