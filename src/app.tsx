import React ,{ useState, useReducer, useEffect } from "react";
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil';
import { createRoot } from "react-dom/client";
import { BaseBtn } from "./atoms/Btn/BaseBtn";
import { MarvelApi, currentPage } from 'RecoilAtom';
import { useFetchData } from 'customHooks';
import { BrowserRouter } from "react-router-dom";
import { Router } from "./RoutesLogic/Router";
import styled from "styled-components";
import { CharacterDefault } from "./pages/Detail/CharacterDefault";


console.log("出力は有効です")


const App: React.FC = () => {
    const [pageData, setPageData]  = useRecoilState(currentPage);
    const apiData = useRecoilValue(MarvelApi);

    const btnClick = () => setPageData(prevPage => prevPage+1);
    useFetchData();
    console.log("apidata: ", apiData[pageData]);


    // 以降の処理でapiDataを使用
    // recoilの使用
    return (
        <BrowserRouter>
            <Router />
            <BaseBtn btnColor="#007bff" onClick={ btnClick }>さらに取得する</BaseBtn>
        </BrowserRouter>
    );
}

const AppContainer = styled.div`
    background-color: #FFF0DC; /* 薄い肌色 */
    min-height: 100vh; /* 画面全体を覆う */
    width: 100%;
`;

const container = document.getElementById("root")! as HTMLDivElement;
const root = createRoot(container);

root.render(
    <RecoilRoot>
        <AppContainer>
            <App />
        </AppContainer>
        
    </RecoilRoot>

);


/* 
    まずは持っているデータだけでプロトタイプを作ること
    {apiData[pageData] && apiData[pageData].map((cha: Character) => (
                <div id={cha.id.toString()}>
                    <p>{cha.name}</p>
                    <img src={cha.thumbnail.path + '.' + cha.thumbnail.extension} alt="Marvel chara" />
                </div>
            ))}
*/