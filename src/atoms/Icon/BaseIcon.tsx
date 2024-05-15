// お気に入り機能で使用
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { loggedInItem, userId } from 'RecoilAtom';
import { addToFavorites, removeFromFavorites } from 'customHooks'; // API関数のダミー

export const FavoriteIcon: React.FC<{characterId: number}> = ({characterId}) => {
  const charaId = characterId.toString();
  const [favorites, setFavorites] = useRecoilState(loggedInItem);
  const [isFavorited, setIsFavorited] = useState(favorites.includes(charaId));
  const userIdNumber = useRecoilValue(userId);
  const iconProps = {
    'data-testid': isFavorited ? 'fill-star' : 'outline-star'
  };

  // コンポーネントのマウント時にお気に入り状態を確認
  useEffect(() => {
    setIsFavorited(favorites.includes(charaId));
  }, [favorites, characterId]);

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);
    let newFavorites;
    if (!isFavorited) {
      newFavorites = [...favorites, characterId];
      await addToFavorites(userIdNumber, characterId); // DBに追加
    } else {
      newFavorites = favorites.filter(id => id !== charaId);
      await removeFromFavorites(userIdNumber, characterId); // DBから削除
    }
    setFavorites(newFavorites);
  };

  return (
    <div onClick={toggleFavorite} style={{ cursor: 'pointer' }}>
      {isFavorited ? <AiFillStar color="yellow" {...iconProps}/> : <AiOutlineStar {...iconProps}/>}
    </div>
  );
};