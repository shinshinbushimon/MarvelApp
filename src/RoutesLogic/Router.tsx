import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterDefault } from "src/pages/CharacterDefault";
import { CharacterDetail } from "src/pages/Detail/CharacterDetail";
import { MovieDetail } from "src/pages/Detail/MovieDetail";
import { SignUpPage, LoginPage } from "src/pages/Home";
import { MainPage } from "src/pages/MainPage";
import { MovieInfo } from "src/pages/MovieInfos";

export const Router = () => {
    return (
        <Routes>
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/mainPage' element={<MainPage />} />
            <Route path='/character/detail' element={<CharacterDetail />} />
            <Route path='/movie/detail' element={<MovieDetail />} />
        </Routes>
    );
}

// <Route path='/favorites' element={<Favorites />} />
// <Route path='/movie/detail' element={<MovieDetail />} />
// <Route path='/movie' element={<MovieInfo />} />
// <Route path='/character' element={<CharacterDefault />} />