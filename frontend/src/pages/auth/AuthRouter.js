import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import LogPage from "./logpage/LogPage";

import './forms.css'

const AuthRouter = () => {
    return (
        <Routes>
            <Route path="" element={<LogPage/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="logout" element={<Logout/>}/>
        </Routes>
    );
};

export default AuthRouter;