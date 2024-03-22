import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useReducer } from 'react';
import { MarvelApi, currentPage } from './RecoilAtom';
import { initialState, postType } from './src/type/app';

// reducerパターンに登録する初期値
const initialData: initialState = {
    isLoading: true,
    isError: '',
    post: []
}

// reducerパターンの定義
const inspectFetchReducer = (currentDataState: initialState, action: postType) => {
    switch (action.type) {
        case 'Loading':
            return {
                isLoading: true,
                isError: '',
                post: []
            }
        case 'Success':
            return {
                isLoading: false,
                isError: '',
                post: action.payload
            }
        case 'Failed':
            return {
                isLoading: false,
                isError: 'fetching is faled..',
                post: []
            }
        default:
            return currentDataState;
    }
}


// カスタムフックス作成
export const useFetchData = () => {
    const pageData  = useRecoilValue(currentPage);
    const [apiData, setApiData] = useRecoilState(MarvelApi);
    const [dataState, dispatch] = useReducer(inspectFetchReducer, initialData);


    useEffect(() => {
        const fetchData = async () => {
            // pageDataに値が無ければとってくる
            if(!apiData[pageData]) {
                try {
                    const response = await fetch(`API_URL?page=${pageData}`);
                    const data = await response.json();
                    dispatch({type: 'Success', payload: data.data.results})

                    // dataのset, ちなみにオブジェクトがアロー関数内で複数行にわたる場合()でくくらなければならない
                    setApiData((prev) => ({
                        ...prev,
                        [pageData]: data
                    }));
                } catch (err) {
                    dispatch({type: 'Failed', payload: []})
                    console.error("ERR", err)
                }
            }
        }
    }, [apiData, setApiData, pageData]);
}
