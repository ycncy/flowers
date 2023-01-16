import React from "react";

const Navbar = () => {

    return (
        <div>
            <nav>
                <p>Flowers</p>
                <a href="/">Accueil</a>
                <a href="/create">Créer</a>
                <a href="/profile">Profil</a>
            </nav>
        </div>
    );
}

export default Navbar