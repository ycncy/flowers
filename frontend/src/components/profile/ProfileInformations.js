import Followers from "./profile_info/Followers";
import Publications from "./profile_info/Publications";
import Following from "./profile_info/Following";
import {useEffect, useState} from "react";
import {postService} from "../../_services/post.service";
import {userService} from "../../_services/user.service";

const ProfileInformations = (props) => {

    const [showPublications, setShowPublications] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showFollowing, setShowFollowing] = useState(false);

    const [publications, setPublications] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        postService.userPosts(props.username)
            .then(res => {
                setPublications(res.data.posts)
            })
            .catch(err => console.log(err));
    }, [props]);

    useEffect(() => {
        userService.getUserFollow(props.username)
            .then(res => {
                setFollowing(res.data.following);
                setFollowers(res.data.followers);
            })
            .catch(err => console.log(err));
    }, [props]);

    return (
        <div>
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