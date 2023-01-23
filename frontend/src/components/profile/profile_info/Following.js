import '../profileInformations.css'

import React from 'react';
import FollowUser from "../FollowUser";

const Following = (props) => {

    if (props.following.length !== 0) {
        return (
            <div className="follow">
                {props.following.map((following, index) => {
                    return <FollowUser key={index} id={following}/>
                })}
            </div>
        );
    }
    return <div>
        <h1>Aucun abonnement :(</h1>
        <h3>Explorez l'accueil pour découvrir de nouveaux utilisateurs</h3>
    </div>
};

export default Following;