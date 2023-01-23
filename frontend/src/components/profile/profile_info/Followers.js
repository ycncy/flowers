import '../profileInformations.css'

import React from 'react';
import FollowUser from "../FollowUser";

const Followers = (props) => {

    if (props.followers.length !== 0) {
        return (
            <div className="follow">
                {props.followers.map((follower, index) => {
                    return <FollowUser key={index} id={follower}></FollowUser>
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