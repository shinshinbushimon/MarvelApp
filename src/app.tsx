import React ,{ useState, useReducer, useEffect } from "react";
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil';
import { createRoot } from "react-dom/client";
import { BaseBtn } from "./atoms/Btn/BaseBtn";
import { MarvelApi, currentPage, loginStatus } from 'RecoilAtom';
import { useFetchData, useHasEverLogin } from 'customHooks';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Router } from "./RoutesLogic/Router";
import styled from "styled-components";
import { CharacterDefault } from "./pages/CharacterDefault";
import { SignUpPage } from "./pages/Home";


console.log("出力は有効です")


const App: React.FC = () => {
    const [pageData, setPageData]  = useRecoilState(currentPage);
    const apiData = useRecoilValue(MarvelApi);
    useHasEverLogin(); // 一番初めにデータの確認をしに行くところ
    const isLogin = useRecoilValue(loginStatus);
    const btnClick = () => setPageData(prevPage => prevPage+1);
    useFetchData();
    console.log("apidata: ", apiData[pageData]);
    console.log("after");
    const nav = useNavigate();

    useEffect(() => {
        if (isLogin === undefined) {
            return;
        }
    
        if(isLogin) {
            nav('/mainPage');
        } else {
            nav('/signup');
        }
    }, [isLogin]);

    

    // 以降の処理でapiDataを使用
    // recoilの使用
    return (
        <AppContainer>
            <Router />
            
            <BaseBtn btnColor="#007bff" onClick={ btnClick }>さらに取得する</BaseBtn>
        </AppContainer>
    );
}

const AppContainer = styled.div`
    background: #f7f7f7; /* 淡いグレーで穏やかな背景色に */
    color: #333; /* 読みやすいテキスト色 */
    font-family: 'Open Sans', sans-serif; /* スタイリッシュなフォント */
    min-height: 100vh; /* 画面全体を覆う */
    width: 100%;
`;

const container = document.getElementById("root")! as HTMLDivElement;
const root = createRoot(container);

root.render(
    <RecoilRoot>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </RecoilRoot>

);


