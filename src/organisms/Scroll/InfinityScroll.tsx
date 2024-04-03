import React, { useState, useEffect, useRef } from "react";
import { createImg, createURI } from "customHooks";
import { AllScrollData, targetCharacterId } from "RecoilAtom";
import { MarvelElement } from "src/type/Common";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BaseImage } from "src/atoms/Img/BaseImg";
import { CustomLink } from "src/atoms/Link/BaseLink";

const ScrollableContainer = styled.div`
  max-height: 300px; // 最大高さを300pxに設定
  overflow-y: auto; // 垂直方向のスクロールを有効に
`;

export const InfinityScroll: React.FC<{dataType: string}> = ({ dataType }) =>{
    const anchorRef = useRef(null);
    const AllData = useRecoilValue(AllScrollData);
    const scrollItem = AllData[dataType];
    const characterId = useRecoilValue(targetCharacterId); // RecoilStateからIDを取得
    const setTargetData = useSetRecoilState(AllScrollData); // AllScrollDataを更新する関数
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [offset, setOffset] = useState(0); // offsetの状態を追加
    

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
                    if (!hasMore) return (
                        <div>no data...</div>
                    );
                    try {
                        const url = createURI(dataType, characterId, offset);
                        console.log("url is ", url);
                        const response = await fetch(url);
                        const responsedData = await response.json();
                        console.log("responsed data is ", responsedData);
                        console.log("dataType is ", dataType);
                        setTargetData(prev => ({
                            ...prev,
                            [dataType]: [...prev[dataType], ...responsedData.data.results]
                        }));
                        const [currentCount, amountOfLimit] = [Number(responsedData.data.count), Number(responsedData.data.total)]
                        const isThereMore = currentCount + offset < amountOfLimit;
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




    return (
        <ScrollableContainer>
            {
                scrollItem.map((scrolled, index) => (
                    <CustomLink to={`${dataType}/detail?resourceType=${dataType}&index=${index}`}>
                        <ImageContainer>
                            <BaseImage src={createImg(scrolled.thumbnail)} alt="Marvel Char" />
                        </ImageContainer>
                        <div key={index}>{scrolled.title}</div>
                    </CustomLink>
                    
                ))
                
            }
            <div ref={anchorRef}>Loading...</div>
        </ScrollableContainer>
    );
}

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; /* コンテナの幅を指定 */
`;
