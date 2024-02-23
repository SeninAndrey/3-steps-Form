import './App.css';
import  React  from 'react';
import { Layout } from "./Layout/Layout.tsx";
import { MainPage } from './Content/MainPage/MainPage.tsx'
import { Routes, Route } from "react-router-dom";

function AppComponent() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage userName={'Alexey Fedorov'}/>}/>
                    <Route path="/create" element={<Layout/>}>
                </Route>
            </Routes>
        </>
    );
}

export default AppComponent;

