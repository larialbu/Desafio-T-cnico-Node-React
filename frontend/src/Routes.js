import React from "react";
import {Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./components/login";
import Cadastro from "./components/Cadastro";


const RoutesApp = () => {
   return(
       <BrowserRouter>
            <Routes>
                <Route element = { <Login/> }  path="/login"/>
                <Route element = { <Cadastro/> } path="login/cadastro"/>

            </Routes>
       </BrowserRouter>
   )
}

export default RoutesApp;