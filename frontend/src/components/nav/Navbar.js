import React, {useContext, useEffect, useState} from "react";
import './navbar.css'

import LogButtons from "../LogButtons";

import {Link} from "react-router-dom";
import {userService} from "../../_services/user.service";
import {UidContext} from "../AppContext";

const Navbar = () => {

    const [username, setUsername] = useState();

    const uid = useContext(UidContext);

    if (uid !== undefined) {
        userService.getUserById(uid)
            .then(res => {
                setUsername(res.data.username)
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="nav">
            <nav>
                <p>Flowers</p>
                <a href="/">Accueil</a>
                <Link to={`/create/${uid}`}>Créer</Link>
                <Link to={`/profil/${username}`}>Profil</Link>
                <LogButtons/>
            </nav>
        </div>
    );
}

export default Navbar