import React, {useEffect, useState} from 'react';
import {userService} from "../_services/user.service";

import '../css/mainpage.css'
import {postService} from "../_services/post.service";
import Post from "../components/post/Post";

const MainPage = (props) => {

    const [username, setUsername] = useState('');
    const [following, setFollowing] = useState([]);
    const [followingPosts, setFollowingPosts] = useState([]);

    useEffect(() => {
        userService.getUserByToken(props.token)
            .then(res => setUsername(res.data.response.username))
            .catch(err => console.log(err));
    }, [props.token]);

    useEffect(() => {
        if (username !== '') {
            userService.getUserFollow(username)
                .then(res => setFollowing(res.data.following))
                .catch(err => console.log(err))
        }
    }, [username]);

    useEffect(() => {
        if (following.length !== 0) {
            following.forEach(user => {
                postService.userPosts(user)
                    .then(res => {
                        setFollowingPosts([...followingPosts, ...res.data])
                    })
                    .catch(err => console.log(err));
            })
        }
    }, [following])

    const listPosts = [];
    for (let i = 0; i < followingPosts.length; i++) {
        listPosts.push(<Post key={i} post={followingPosts[0]}/>)
    }

    if (following.length === 0) {
        return (
            <div className="corps">
                <h1>Vous n'êtes abonné à aucun compte</h1>
            </div>
        )
    }
    if (followingPosts.length === 0) {
        return (
            <div className="corps">
                <h1>Vos comptes suivis n'ont encore rien posté pour
                    l'instant</h1>
            </div>
        );
    } else {
        return (
            <div className="corps">
                {listPosts}
            </div>
        )
    }
};

export default MainPage;