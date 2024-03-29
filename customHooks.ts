import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { MarvelApi, currentPage, searchValue, searchOutput } from './RecoilAtom';

const waitTime = 1000 // 検索記入欄で遅延させる時間

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
export const useSearchOutput = async () => {
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
