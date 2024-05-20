// お気に入り機能で使用
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { loggedInItem, userId } from 'RecoilAtom';
import { addToFavorites, removeFromFavorites } from 'customHooks'; // API関数のダミー
import { FavoriteProps } from 'src/type/app';

export const FavoriteIcon: React.FC<FavoriteProps> = ({ 
  targetId,
  favorites,
  setFavorites,
  targetItem
 }) => {

  const [isFavorited, setIsFavorited] = useState(favorites.includes(targetId));
  console.log('お気に入りたちはこいつらです', favorites);
  console.log('このキャラクターはお気に入りの一部ですか', favorites.includes(targetId));
  console.log('そして結果はどのように解釈されていますか', isFavorited);
  const userIdNumber = useRecoilValue(userId);

  const iconProps = {
    'data-testid': isFavorited ? 'fill-star' : 'outline-star'
  };

  // コンポーネントのマウント時にお気に入り状態を確認
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
    <div onClick={toggleFavorite} style={{ cursor: 'pointer' }}>
      {isFavorited ? <AiFillStar color="yellow" {...iconProps}/> : <AiOutlineStar {...iconProps}/>}
    </div>
  );
};