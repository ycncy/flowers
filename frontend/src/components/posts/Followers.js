import React, {useEffect, useState} from 'react';
import {postService} from "../../_services/post.service";

const Followers = (props) => {

    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        postService.userPosts(props.username)
            .then(res => setFollowers(res.data.followers))
            .catch(err => console.log(err));
    }, [followers])

    return (
        <div>
            {followers.forEach((follower, index) => {
                <li key={index}>
                    <p>follower.username</p>
                </li>
            })}
        </div>
    );
};

export default Followers;