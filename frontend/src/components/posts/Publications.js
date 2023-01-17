import React, {useEffect, useState} from 'react';
import {postService} from "../../_services/post.service";

const Publications = (props) => {

    const [publications, setPublications] = useState([]);

    useEffect(() => {
        postService.userPosts(props.username)
            .then(res => setPublications(res.data.posts))
            .catch(err => console.log(err));
    }, [])

    return (
        <div>
            {publications.forEach((post, index) => {
                <li key={index}>
                    <p>post.description</p>
                    <p>post.author</p>
                </li>
            })}
        </div>
    );
};

export default Publications;