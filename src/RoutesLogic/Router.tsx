import React from "react";
import { Routes, Route } from "react-router-dom";
import { CharacterList } from "src/organisms/List/CharacterList";
import CharacterDetail from "src/pages/Detail/CharacterDetail";

export const Router = () => {
    return (
        <Routes>
            <Route path='/character' element={<CharacterList />} />
            <Route path='/character/detail' element={<CharacterDetail />} />
            
        </Routes>
    );
}

// 
// <Route path='*' element={ <Page404 /> }/>