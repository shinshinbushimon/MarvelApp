import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { MarvelApi, currentPage } from './RecoilAtom';



// カスタムフックス作成
export const useFetchData = () => {
    const category = "Character";
    const pageData  = useRecoilValue(currentPage);
    const [apiData, setApiData] = useRecoilState(MarvelApi);


    useEffect(() => {
        const fetchData = async () => {
            // pageDataに値が無ければとってくる
            if(!apiData[category] || !apiData[category][pageData]) {
                try {
                    const response = await fetch(`http://localhost:3001/marvel-characters?page=${pageData}`);
                    const data = await response.json();

                    // dataのset, ちなみにオブジェクトがアロー関数内で複数行にわたる場合()でくくらなければならない
                    setApiData((prev) => ({
                        ...prev,
                        [category]: {
                            ...prev[category],
                            [pageData]: data.data.results // カテゴリとページキーを指定してデータを更新
                        }
                    }));
                } catch (err) {
                    console.error("ERR", err)
                }
            }
        }
        fetchData();
    }, [apiData, setApiData, pageData]);
}
