import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterDefault } from "src/pages/CharacterDefault";
import { CharacterDetail } from "src/pages/Detail/CharacterDetail";
import { DynamicScrollDetail } from "src/pages/Detail/DynamicScrollDetail";
import { SignUpPage, LoginPage } from "src/pages/Home";

export const Router = () => {
    return (
        <Routes>
            <Route path='/signup' element={<SignUpPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/character' element={<CharacterDefault />} />
            <Route path='/character/detail' element={<CharacterDetail />} />
            <Route path='/:dataType/detail' element={<DynamicScrollDetail />} />
        </Routes>
    );
}