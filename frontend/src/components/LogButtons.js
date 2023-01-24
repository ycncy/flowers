import React from 'react';
import {authService} from "../_services/auth.service";

const LogButtons = () => {

    const isLogged = authService.isLogged();

    if (isLogged) {
        return (
            <a href="/connexion/logout">
                Se déconnecter
            </a>
        )
    } else {
        return (
            <div>
                <a href="/connexion/login">Se connecter</a>
                <a href="/connexion/register">S'inscrire</a>
            </div>
        )
    }
};

export default LogButtons;