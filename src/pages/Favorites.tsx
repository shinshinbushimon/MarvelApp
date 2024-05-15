import React from 'react';
import { useRecoilValue } from 'recoil';
import { loggedInItem } from 'RecoilAtom'; // Recoilアトムのインポート

export const Favorite = () => {
    const favorites = useRecoilValue(loggedInItem);

    return (
        <div>
            {favorites && favorites.length > 0 ? (
                <ul>
                    {favorites.map((favItem, index) => (
                        <li key={index}>{favItem}</li>
                    ))}
                </ul>
            ) : (
                <p>No favorite items found.</p>
            )}
        </div>
    );
};
