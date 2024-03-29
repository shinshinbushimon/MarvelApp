import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterDefault } from "src/pages/Detail/CharacterDefault";
import CharacterDetail from "src/pages/Detail/CharacterDetail";
import { HomePage } from "src/pages/Home";

export const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/character' element={<CharacterDefault />} />
            <Route path='/character/detail' element={<CharacterDetail />} />
            
        </Routes>
    );
}


// <Route path='*' element={ <Page404 /> }/>