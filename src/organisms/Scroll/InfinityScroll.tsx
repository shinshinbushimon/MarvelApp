import React, { useState, useEffect, useRef } from "react";
import { createImg, createURI } from "customHooks";
import { AllScrollData, targetCharacterId } from "RecoilAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BaseImage } from "src/atoms/Img/BaseImg";
import { CustomLink } from "src/atoms/Link/BaseLink";


export const InfinityScroll: React.FC<{dataType: string}> = ({ dataType }) =>{
    const anchorRef = useRef(null);
    const AllData = useRecoilValue(AllScrollData);
    const scrollItem = AllData[dataType];
    const characterId = useRecoilValue(targetCharacterId); // RecoilStateからIDを取得
    const setTargetData = useSetRecoilState(AllScrollData); // AllScrollDataを更新する関数
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0); // offsetの状態を追加
    const [dataExists, setDataExists] = useState(true);
    

    useEffect(() => {
        setTargetData(prev =>({
            ...prev,
            [dataType]: []
        }));
        setOffset(0);
    }, [characterId])

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(async entry => {
                if (entry.isIntersecting) {
                    if (!hasMore) return;
                    try {
                        const url = createURI(dataType, characterId, offset);
                        console.log("url is ", url);
                        const response = await fetch(url);
                        const responsedData = await response.json();
                        console.log("responsed data is ", responsedData);
                        console.log("dataType is ", dataType);

                        if (offset === 0 && responsedData.data.results.length === 0) { // データがもはや最初から存在しない
                            setDataExists(false);
                            return;
                        }

                        setTargetData(prev => ({
                            ...prev,
                            [dataType]: [...prev[dataType], ...responsedData.data.results]
                        }));

                        const [currentCount, amountOfLimit] = [Number(responsedData.data.count), Number(responsedData.data.total)]
                        const isThereMore = (currentCount + offset) < amountOfLimit;
                        setHasMore(isThereMore);
                        if (isThereMore) {
                            setOffset(prevOffset => prevOffset + currentCount); // offsetを更新
                        }

                        
                        
                        console.log(`This response's count & total are: total: ${amountOfLimit}, count: ${currentCount}`);
                    } catch (error) {
                        console.error("Fetching data failed:", error);
                        setHasMore(false);
                    }
                }
            });
        });

        if (anchorRef.current) {
            observer.observe(anchorRef.current);
        }

        return () => {
            if (observer && anchorRef.current) observer.unobserve(anchorRef.current);
        }
    }, [dataType, hasMore, offset]);

    if(!dataExists) {
        return <div>No data avaliable.</div>;
    }



    return (
        <ScrollableContainer>
            {
                scrollItem.map((scrolled, index) => (
                    <InfinityScrollLink to={`/${dataType}/detail?index=${index}`} key={index}>
                        {createImg(scrolled.thumbnail) && (
                            <ImageContainer>
                                <InfinityScrollImage src={createImg(scrolled.thumbnail)} alt="Marvel Char" />
                            </ImageContainer>
                        )}
                        <TitleContainer key={index}>{scrolled.title}</TitleContainer>
                    </InfinityScrollLink>
                    
                ))
                
            }
            <div ref={anchorRef}></div>
            {hasMore ? <div>Loading...</div> : <div>EOF</div>}
        </ScrollableContainer>
    );
}
const ScrollableContainer = styled.div`
  max-height: 300px; // 最大高さを300pxに設定
  overflow-y: auto; // 垂直方向のスクロールを有効に
`;

const ImageContainer = styled.div`
    width: 50px; // 明示的に幅を設定
    height: 50px; // 明示的に高さを設定
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px; // タイトルとの間のマージン
`;

const InfinityScrollImage = styled(BaseImage)`
  width: 50px; // 新しい幅の定義
  height: 50px; // 新しい高さの定義
  object-fit: cover; // 画像のアスペクト比を保ちつつコンテナに合わせる
  border-radius: 50%;
  max-width: none; /* 継承された最大幅のスタイルを無効にする */
  max-height: none; /* 継承された最大高さのスタイルを無効にする */
  // 必要に応じて他のスタイルを追加
`;

const InfinityScrollLink = styled(CustomLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center; // タイトルを中央に配置
  // ここでタイトルのスタイリングを行う
`;