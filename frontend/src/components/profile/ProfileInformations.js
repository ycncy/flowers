import React, {useEffect, useState} from 'react';
import Test1 from "../../pages/Test1";
import Test2 from "../../pages/Test2";

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
            {divStates.publications && <Test1/>}
            <hr/>
            {divStates.followers && <Test2/>}
            <hr/>
            <nav>
                <button onClick={() => showHide("publications")}>Publications
                </button>
                <button onClick={() => showHide("followers")}>Abonnés</button>
                <button onClick={() => showHide("following")}>Abonnements
                </button>
                <button onClick={() => showHide("likes")}>J'aime</button>
            </nav>
        </div>
    );
};

export default ProfileInformations;