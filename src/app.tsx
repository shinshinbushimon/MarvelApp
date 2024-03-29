import React ,{ useState, useReducer, useEffect } from "react";
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil';
import { createRoot } from "react-dom/client";
import { BaseBtn } from "./atoms/Btn/BaseBtn";
import { Character } from "./type/Character";
import { MarvelApi, currentPage } from 'RecoilAtom';
import { useFetchData } from 'customHooks';
import { CharacterList } from "./organisms/List/CharacterList";


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
        <> 
            <CharacterList />
            <BaseBtn btnColor="#007bff" onClick={ btnClick }>さらに取得する</BaseBtn>
        </>
    );
}

const container = document.getElementById("root")! as HTMLDivElement;
const root = createRoot(container);

root.render(
    <RecoilRoot>
        <App />
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