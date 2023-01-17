import React, {useEffect, useState} from 'react';

import Publications from "../posts/Publications";
import Followers from "../posts/Followers";
import Following from "../posts/Following";

const ProfileInformations = (props) => {

    return (
        <div>
            <nav>
                <button onClick={() => showHide("publications")}>Publications
                </button>
                <button onClick={() => showHide("followers")}>Abonnés</button>
                <button onClick={() => showHide("following")}>Abonnements
                </button>
            </nav>
            <div className="content">
                <hr/>
                {divStates.publications &&
                    <Publications username={props.username}/>}
                <hr/>
                {divStates.followers && <Followers/>}
                <hr/>
                {divStates.following && <Following/>}
            </div>
        </div>
    );
};

export default ProfileInformations;