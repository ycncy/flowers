import React from 'react';
import {Link} from "react-router-dom";

import './logpage.css'
import Logo from '../../../images/flower.png'

const LogPage = () => {

    return (
        <div className="container">
            <div className="presentation">
                <img src={Logo}/>
                <p>Bienvenue sur Flowers.</p>
            </div>
            <div className="buttons">
                <Link className="link" to="/connexion/login">Se connecter</Link>
                <Link className="link"
                      to="/connexion/register">S'inscrire</Link>
            </div>
        </div>
    );
};

export default LogPage;