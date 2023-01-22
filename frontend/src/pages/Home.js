import Navbar from "../components/nav/Navbar";
import MainPage from "./MainPage";

import '../css/home.css'

import {authService} from "../_services/auth.service";
import {Navigate} from "react-router-dom";

export function Home() {

    const isLogged = authService.isLogged();

    if (isLogged) {
        return (
            <div className="logged">
                <Navbar/>
                <MainPage/>
            </div>
        )
    }
    return (
        <Navigate to="/connexion"></Navigate>
    );
}