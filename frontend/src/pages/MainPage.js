import React, {useContext, useEffect, useState} from 'react';

import '../css/mainpage.css'

import {userService} from "../_services/user.service";
import {postService} from "../_services/post.service";
import {UidContext} from "../components/AppContext";
import Post from "../components/post/Post";

const MainPage = () => {

    const uid = useContext(UidContext);

    const [following, setFollowing] = useState([]);
    const [followingPosts, setFollowingPosts] = useState([]);

    const fetchFollows = async (uid) => {
        userService.getUserFollow(uid)
            .then(res => {
                setFollowing(res.data.following)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        if (uid !== undefined) {
            fetchFollows(uid)
        }
        setFollowingPosts([])
    }, [uid]);


    useEffect(() => {
        if (following.length !== 0) {
            following.forEach((user) => {
                postService.userPosts(user)
                    .then(res => {
                        setFollowingPosts([...followingPosts, ...res.data])
                    })
                    .catch(err => console.log(err));
            })
        }
    }, [following])


    if (following.length === 0) {
        return (
            <h1 style={{textAlign: "center"}}>Vous n'êtes abonné à aucun
                compte</h1>
        )
    }

    if (followingPosts.length === 0) {
        return (
            <h1 style={{textAlign: "center"}}>Vos comptes suivis n'ont encore
                rien posté pour l'instant</h1>
        );
    } else {
        return (
            <div className="corps">
                {followingPosts.map((post, index) => {
                    return (<Post key={index} post={post}/>)
                })}
            </div>
        )
    }
};

export default MainPage;