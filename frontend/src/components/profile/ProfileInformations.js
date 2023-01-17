import React, {useState} from 'react';

import Publications from "../posts/Publications";
import Followers from "../posts/Followers";
import Following from "../posts/Following";

const ProfileInformations = () => {

    const [divStates, setDivStates] = useState({
        publications: true,
        followers: false,
        following: false,
        likes: false
    })

    const showHide = (name) => {
        switch (name) {
            case "publications":
                setDivStates({
                    likes: false,
                    publications: true,
                    followers: false,
                    following: false
                });
                break;
            case "followers":
                setDivStates({
                    likes: false,
                    publications: false,
                    followers: true,
                    following: false
                });
                break;
            case "following":
                setDivStates({
                    likes: false,
                    publications: false,
                    followers: false,
                    following: true
                });
                break;
            case "likes":
                setDivStates({
                    likes: true,
                    publications: false,
                    followers: false,
                    following: false
                });
                break;
            default:
                break;
        }
    }

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
                {divStates.publications && <Publications/>}
                <hr/>
                {divStates.followers && <Followers/>}
                <hr/>
                {divStates.following && <Following/>}
            </div>
        </div>
    );
};

export default ProfileInformations;