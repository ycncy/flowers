import React, {useEffect, useState} from "react";
import './navbar.css'
import LogButtons from "../LogButtons";
import {Link} from "react-router-dom";
import {userService} from "../../_services/user.service";

const Navbar = (props) => {

    const [username, setUsername] = useState();

    useEffect(() => {
        userService.getUserByToken(props.token)
            .then(res => setUsername(res.data.user.username))
            .catch(err => console.log(err));
    }, [props])

    return (
        <div>
            <nav>
                <p>Flowers</p>
                <a href="/">Accueil</a>
                <a href="/create">Créer</a>
                <Link to={`/profil/${username}`}>Profil</Link>
                <LogButtons/>
            </nav>
        </div>
    );
}

export default Navbar