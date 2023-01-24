import Followers from "./profile_info/Followers";
import Publications from "./profile_info/Publications";
import Following from "./profile_info/Following";

import {useContext, useEffect, useState} from "react";

import {postService} from "../../_services/post.service";
import {userService} from "../../_services/user.service";
import {UidContext} from "../AppContext";

import './profileInformations.css'

const ProfileInformations = (props) => {

    const [showPublications, setShowPublications] = useState(true);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const [publications, setPublications] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const uid = useContext(UidContext)

    const userPosts = () => {
        postService.userPosts(uid)
            .then(res => {
                setPublications(res.data)
            })
            .catch(err => console.log(err));
    }

    const userFollows = () => {
        if (uid !== undefined) {
            userService.getUserFollow(uid)
                .then(res => {
                    setFollowing(res.data.following);
                    setFollowers(res.data.followers);
                })
                .catch(err => console.log(err));
        }
    }

    userPosts();
    userFollows();

    return (
        <div className="informations">
            <h1>{props.username.username}</h1>
            <nav>
                <button onClick={() => {
                    setShowPublications(true)
                    setShowFollowing(false)
                    setShowFollowers(false)
                }}>
                    Publications
                </button>

                <button onClick={() => {
                    setShowPublications(false)
                    setShowFollowing(false)
                    setShowFollowers(true)
                }}>
                    Abonnés
                </button>
                <button onClick={() => {
                    setShowPublications(false)
                    setShowFollowing(true)
                    setShowFollowers(false)
                }}>
                    Abonnements
                </button>
            </nav>

            {showPublications && <Publications publications={publications}/>}
            {showFollowers && <Followers followers={followers}/>}
            {showFollowing && <Following following={following}/>}
        </div>
    );
};

export default ProfileInformations;