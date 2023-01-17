import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";


const AuthRouter = () => {
    return (
        <Routes>
            <Route index element={<Login/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="logout" element={<Logout/>}/>
        </Routes>
    );
};

export default AuthRouter;