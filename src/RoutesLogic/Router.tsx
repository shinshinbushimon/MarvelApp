import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterDefault } from "src/pages/CharacterDefault";
import { CharacterDetail } from "src/pages/Detail/CharacterDetail";
import { ComicsDetail } from "src/pages/Detail/ComicsDetail";
import { EventDetail } from "src/pages/Detail/EventDetail";
import { SeriesDetail } from "src/pages/Detail/SeriesDetail";
import { StoryDetail } from "src/pages/Detail/StoryDetail";
import { HomePage } from "src/pages/Home";

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/character' element={<CharacterDefault />} />
            <Route path='/character/detail' element={<CharacterDetail />} />
            <Route path='/comics/detail' element={<ComicsDetail />} />
            <Route path='/events/detail' element={<EventDetail />} />
            <Route path='/series/detail' element={<SeriesDetail />} />
            <Route path='/story/detail' element={<StoryDetail />} />
            
        </Routes>
    );
}


// <Route path='*' element={ <Page404 /> }/>