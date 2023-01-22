import '../profileInformations.css'

import React from 'react';

const Followers = (props) => {

    if (props.followers.length !== 0) {
        return (
            <div>
                {props.followers.map((follower, index) => {
                    return <p key={index}>{follower}</p>
                })}
            </div>
        );
    }
    return <div>
        <h1>Followers Error ?!</h1>
        <h3>Vous n'avez aucun follower :(</h3>
    </div>
};

export default Followers;