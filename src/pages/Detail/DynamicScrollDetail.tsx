import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { ComicsDetail } from "src/pages/Detail/ComicsDetail";
import { EventDetail } from "src/pages/Detail/EventDetail";
import { SeriesDetail } from "src/pages/Detail/SeriesDetail";
import { StoryDetail } from "src/pages/Detail/StoryDetail";
import { NotFound } from "../NotFound";

const DynamicScrollDetail: React.FC = () => {
  const { dataType } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const index = Number(query.get('index'));
  console.log("At least Dynamic Routing is passed");

  // dataTypeに応じた処理。例えば、
  switch (dataType) {
    case 'comics':
      return <ComicsDetail index={index} />
    case 'events':
      return <EventDetail index={index} />
    case 'series':
      return <SeriesDetail index={index} />
    case 'stories':
      return <StoryDetail index={index} />
    default:
      return <NotFound />
  }

}