import React ,{ useEffect } from "react";
import { RecoilRoot, useRecoilValue } from 'recoil';
import { createRoot } from "react-dom/client";
import { loginStatus } from 'RecoilAtom';
import { useFetchData, useHasEverLogin } from 'customHooks';
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Router } from "./RoutesLogic/Router";
import styled from "styled-components";


const App: React.FC = () => {
    useHasEverLogin();
    const isLogin = useRecoilValue(loginStatus);
    useFetchData();
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

    return (
        <AppContainer>
            <Router />
            
        </AppContainer>
    );
}

const AppContainer = styled.div`
    background: #f7f7f7; 
    color: #333; 
    font-family: 'Open Sans', sans-serif; 
    min-height: 100vh;
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


