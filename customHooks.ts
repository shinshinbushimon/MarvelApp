import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useRef, useState } from 'react';
import { MarvelApi, currentPage, searchValue, searchOutput, targetCharacterId, targetCharacter, AllScrollData } from './RecoilAtom';
import { Character } from 'src/type/Character';
import { Image, MarvelElement } from 'src/type/Common';
import { ComicDataContainer } from 'src/type/Comic';

const waitTime = 500 // 検索記入欄で遅延させる時間

// DBアクセス結果のリクエストをサーバへ送信するカスタムフックス
export const useFetchData = () => {
    const pageData  = useRecoilValue(currentPage);
    const [apiData, setApiData] = useRecoilState(MarvelApi);


    useEffect(() => {
        const fetchData = async () => {
            // pageDataに値が無ければとってくる
            if(!apiData[pageData]) {
                try {
                    const response = await fetch(`http://localhost:3001/marvel-characters?page=${pageData}`);
                    const data = await response.json();

                    // dataのset, ちなみにオブジェクトがアロー関数内で複数行にわたる場合()でくくらなければならない
                    setApiData((prev) => ({
                        ...prev,
                        [pageData]: data
                    }));
                } catch (err) {
                    console.error("ERR", err)
                }
            }
        }
        fetchData();
    }, [apiData, setApiData, pageData]);
}

// 検索結果表示のためにリクエストを依頼するカスタムフック
export const useSearchOutput = () => {
    const searchQuery = useRecoilValue(searchValue); // inputに紐づける検索値
    const [_, setSearchResults] = useRecoilState(searchOutput); // 検索結果を保持する配列

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                const jobId = setTimeout(async () => {
                    const response = await fetch(`http://localhost:3001/marvel-characters-search?name=${searchQuery}`);
                    setSearchResults(await response.json());
                }, waitTime);

                return () => clearTimeout(jobId);
            } else {
                setSearchResults([]);
            }
        };

        fetchData();
    }, [searchQuery]); // searchQueryの変更を検知して実施する。
}


// 未キャッシュの詳細情報を表示するためにDBに取得しに行く
export const useDetailSearch = () => {
    const pageData  = useRecoilValue(currentPage);
    const apiData = useRecoilValue(MarvelApi);
    const watchingId = useRecoilValue(targetCharacterId);
    const setCharacterInfo = useSetRecoilState(targetCharacter);
    const [isLoading, setIsLoading] = useState(true);
    console.log("current waching Id is ", watchingId);

    useEffect(() => {
        console.log("Effectが実行されました");
        const getData = async () => {
            setIsLoading(true);
            console.log("this place is useDetailSearch ,and the needed data is ", apiData);
            let cachedData = apiData[pageData]?.find(character => character.id === watchingId);
            console.log("cachedData is ", cachedData);

            if (cachedData) {
                setCharacterInfo(cachedData);
                setIsLoading(false);
            } else {
                try {
                    
                    const response = await fetch(`http://localhost:3001/marvel-character-detail?characterId=${watchingId}`);
                    
                    const data = await response.json();
                    setCharacterInfo(data);
                } catch (error) {
                    console.error("Error fetching character detail:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        getData();
    }, [watchingId]);

    return isLoading;
};

// serverpointを作成
export const createURI = (dataType: string, characterId: number, offset: number) => {
    return `http://localhost:3001/marvel-characters/${characterId}/${dataType}?offset=${offset}`
}

export const createImg = (img: Image) => {
    if (!img || !img.path || !img.extension) {
        return ''; // またはデフォルトの画像URLを返す
    }
    return img.path + '.' + img.extension
}

