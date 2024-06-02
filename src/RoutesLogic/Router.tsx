import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterDetail } from "src/pages/Detail/CharacterDetail";
import { ComicsDetail } from "src/pages/Detail/ComicsDetail";
import { EventDetail } from "src/pages/Detail/EventDetail";
import { MovieDetail } from "src/pages/Detail/MovieDetail";
import { SeriesDetail } from "src/pages/Detail/SeriesDetail";
import { SignUpPage, LoginPage } from "src/pages/Home";
import { MainPage } from "src/pages/MainPage";

export const Router = () => {
    return (
        <Routes>
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/mainPage' element={<MainPage />} />
            <Route path='/character/detail' element={<CharacterDetail />} />
            <Route path='/comics/detail' element={<ComicsDetail />} />
            <Route path='/movie/detail' element={<MovieDetail />} />
            <Route path='/series/detail' element={<SeriesDetail />} />
            <Route path='/events/detail' element={<EventDetail />} />
        </Routes>
    );
}