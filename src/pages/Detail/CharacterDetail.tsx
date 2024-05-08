import React, { useEffect } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { targetCharacterId, targetCharacter, AllScrollData } from "RecoilAtom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { BaseBtn } from "src/atoms/Btn/BaseBtn";
import { InfinityScroll } from "src/organisms/Scroll/InfinityScroll";
import { useDetailSearch } from "customHooks";
import { FavoriteIcon } from "src/atoms/Icon/BaseIcon";
import { BackButton } from "src/atoms/Btn/BackButton";

// 各関連要素のコンポーネントに, className=.marvelItemと追記すること

export const CharacterDetail: React.FC = () => {
  
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const characterId = Number(query.get("characterId"));
  console.log("characterId is ", characterId);

  const setId = useSetRecoilState(targetCharacterId);
  setId(characterId);
  const isLoading = useDetailSearch();
  let nav = useNavigate();
  
  
  const mainData = useRecoilValue(targetCharacter);
  if (isLoading) {
    // ローディング中の場合はローディング表示
    return <div>Loading...</div>;
  }

  // データが存在しない場合はローディング表示
  const { thumbnail, name, modified, description, resourceURI, urls } = mainData;

  // 省略: コンポーネントのレンダリング部分
    console.log("queryObjは、", query);
    return (

        <Container>
          <FavoriteIcon characterId={characterId} />
          <ImageContainer>
              <CharacterImage src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
              <ModifiedDate>Last Modified: {modified.toString()}</ModifiedDate>
          </ImageContainer>
          <DetailContainer>
              <CharacterName>{name}</CharacterName>
              <CharacterDescription>{description}</CharacterDescription>
              <MoreDetails href={resourceURI} target="_blank" rel="noopener noreferrer">More Details</MoreDetails>
              <UrlsContainer>
                {urls.map((url, index) => (
                    <UrlLink key={index} href={url.url} target="_blank" rel="noopener noreferrer">{url.type}</UrlLink>
                ))}
              </UrlsContainer>
              <ItemDataContainer>
                 {/* コミックスデータをレンダリング */}
                 <p>Comics: </p>
                <InfinityScroll dataType="comics" />
                {/* スクロール監視対象となる要素 */}
              </ItemDataContainer>
              <ItemDataContainer>
                 {/* コミックスデータをレンダリング */}
                 <p>Event: </p>
                <InfinityScroll dataType="events" />
                {/* スクロール監視対象となる要素 */}
              </ItemDataContainer>
              <ItemDataContainer>
                 {/* コミックスデータをレンダリング */}
                 <p>Series: </p>
                <InfinityScroll dataType="series" />
                {/* スクロール監視対象となる要素 */}
              </ItemDataContainer>
              <ItemDataContainer>
                 {/* コミックスデータをレンダリング */}
                 <p>Stories: </p>
                <InfinityScroll dataType="stories" />
                {/* スクロール監視対象となる要素 */}
              </ItemDataContainer>
              
              <BackButton/>
          </DetailContainer>
        </Container>
  );
};


const Container = styled.div`
  display: flex;
  margin: 20px;
`;

const ImageContainer = styled.div`
  flex: 1;
`;

const CharacterImage = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
`;

const ModifiedDate = styled.p`
  text-align: center;
  margin-top: 10px;
`;

const DetailContainer = styled.div`
  flex: 2;
  margin-left: 20px;
`;

const CharacterName = styled.h1``;

const CharacterDescription = styled.p``;

const MoreDetails = styled.a`
  display: block;
  margin-top: 10px;
`;

const UrlsContainer = styled.div`
  margin-top: 10px;
`;

const ItemDataContainer = styled.div`
  margin-top: 10px;
`;

const UrlLink = styled.a`
  display: inline-block;
  margin-right: 10px;
`;