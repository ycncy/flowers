import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Profile} from "./pages/Profile"
import {Home} from "./pages/Home"

import AuthRouter from "./pages/auth/AuthRouter";

import './css/app.css'
import {useEffect, useState} from "react";
import React from "react";

import {userService} from "./_services/user.service";
import {authService} from "./_services/auth.service";
import {UidContext} from "./components/AppContext";

function App() {

    const [uid, setUid] = useState();

    const func = async () => {
        await userService.getUserByToken(authService.getToken())
            .then(res => setUid(res.data.response._id))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        func().then(r => {
        }).catch(err => console.log(err));
    }, [])

    return (
        <UidContext.Provider value={uid}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home/>}></Route>
                    <Route path="/profil/:username" element={
                        <Profile/>}></Route>
                    <Route path="/connexion/*" element={<AuthRouter/>}></Route>
                </Routes>
            </BrowserRouter>
        </UidContext.Provider>
    );
}

export default App;
