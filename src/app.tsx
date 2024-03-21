import React ,{ useState, useReducer, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BaseBtn } from "./atoms/BaseBtn";
import { CharacterDataWrapper, Character } from "./type/Character";
import { initialState, postType } from "./type/app"
import axios from 'axios';


console.log("出力は有効です")
const iniVal: initialState = {
    isLoading: true,
    isError: '',
    post: []
}

const dataFetchReducer = (dataState: initialState, action: postType) => {
    switch (action.type) {
        case 'Start': // 開始
            return {
                isLoading: true,
                isError: '',
                post: []
            }
        case 'Success':// 成功
            console.log("response is suceseeded", action.payload)
            return {
                isLoading: false,
                isError: '',
                post: action.payload
            }
        case 'Error': // 失敗
            return {
                isLoading: false,
                isError: '読み込みエラーが発生しました。',
                post: []
            }
        default:
            return dataState
    }
}


const App: React.FC = () => {
    const [dataState, dispatch] = useReducer(dataFetchReducer, iniVal);
    useEffect(() => {
        axios
        .get('http://localhost:3001/marvel-characters')
        .then(res => {
            console.log("APIから受け取ったデータ：", res.data)
            console.log("APIから受け取ったデータ：", res.data.data.results)
            dispatch({type: 'Success', payload: res.data.data.results})
        })
        .catch(err => {
            dispatch({type: 'Error', payload: []})
        })
    }, [])

    // 以降の処理でapiDataを使用
    return (
        <>
            {dataState.post && dataState.post.map((cha: Character) => (
                <div id={cha.id.toString()}>
                    <p>{cha.name}</p>
                    <img src={cha.thumbnail.path + '.' + cha.thumbnail.extension} alt="Marvel chara" />
                </div>
            ))}
            <BaseBtn btnColor="#007bff" onClick={ () => console.log("ボタンが押下されました。") }>これはテストボタンです。</BaseBtn>
        </>
    );
}

const container = document.getElementById("root")! as HTMLDivElement;
const root = createRoot(container);

root.render(<App />);

/* 
    まずは持っているデータだけでプロトタイプを作ること
*/