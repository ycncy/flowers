import Navbar from "../components/nav/Navbar";
import MainPage from "./MainPage";

import '../css/home.css'

import {authService} from "../_services/auth.service";
import LogPage from "./LogPage";

export function Home() {

    const isLogged = authService.isLogged();

    if (isLogged) {
        const loggedUser = authService.getToken();
        return (
            <div className="logged">
                <Navbar token={loggedUser}/>
                <MainPage token={loggedUser}/>
            </div>
        )
    }
    return (
        <LogPage/>
    );
}