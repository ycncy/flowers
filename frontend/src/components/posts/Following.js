import React, {useEffect, useState} from 'react';
import {postService} from "../../_services/post.service";

const Following = (props) => {

    const [following, setFollowing] = useState([]);

    useEffect(() => {
        postService.userPosts(props.username)
            .then(res => setFollowing(res.data.following))
            .catch(err => console.log(err));
    }, [following])

    return (
        <div>
            {following.forEach((following, index) => {
                <li key={index}>
                    <p>following.username</p>
                </li>
            })}
        </div>
    );
};

export default Following;