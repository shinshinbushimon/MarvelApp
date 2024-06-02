import React, { useState, useEffect, useRef } from "react";
import axios from 'axios'; 
import { createImg, createURI } from "customHooks";
import { AllScrollData, targetCharacterId } from "RecoilAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { CustomLink } from "src/atoms/Link/BaseLink";

const InfinityScrollLink = styled(CustomLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
  &:last-child {
    border-bottom: none;
  }
`;

export const InfinityScroll: React.FC<{ dataType: string }> = ({ dataType }) => {
  const anchorRef = useRef(null);
  const AllData = useRecoilValue(AllScrollData);
  const scrollItem = AllData[dataType];
  const characterId = useRecoilValue(targetCharacterId);
  const setTargetData = useSetRecoilState(AllScrollData);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [dataExists, setDataExists] = useState(true);

  useEffect(() => {
    setTargetData(prev => ({
      ...prev,
      [dataType]: []
    }));
    setOffset(0);
  }, [characterId, setTargetData, dataType]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting) {
          if (!hasMore) return;
          try {
            const url = createURI(dataType, characterId, offset);
            const response = await axios.get(url);
            const responsedData = response.data; 

            if (offset === 0 && responsedData.data.results.length === 0) {
              setDataExists(false);
              return;
            }

            setTargetData(prev => ({
              ...prev,
              [dataType]: [...prev[dataType], ...responsedData.data.results]
            }));

            const [currentCount, amountOfLimit] = [Number(responsedData.data.count), Number(responsedData.data.total)];
            const isThereMore = (currentCount + offset) < amountOfLimit;
            setHasMore(isThereMore);
            if (isThereMore) {
              setOffset(prevOffset => prevOffset + currentCount);
            }

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
    };
  }, [dataType, hasMore, offset, characterId, setTargetData]);

  if (!dataExists) {
    return <div>データがありません</div>;
  }

  return (
    <ScrollableContainer>
      {scrollItem.map((scrolled, index) => (
        <InfinityScrollLink to={`/${dataType}/detail?index=${index}`} key={index}>
          {createImg(scrolled.thumbnail) && (
            <ImageContainer>
              <InfinityScrollImage src={createImg(scrolled.thumbnail)} alt="Marvel Char" />
            </ImageContainer>
          )}
          <TitleContainer>{scrolled.title}</TitleContainer>
        </InfinityScrollLink>
      ))}
      <div ref={anchorRef}></div>
      {hasMore ? <div>取得しています...</div> : <div>データはここまでです</div>}
    </ScrollableContainer>
  );
}

const ScrollableContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
`;

const ImageContainer = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const InfinityScrollImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;