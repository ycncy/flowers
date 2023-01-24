import './post.css'

import Like from "../buttons/Like";
import Comment from "../buttons/Comment";

import {useContext, useEffect, useState} from "react";

import {UidContext} from "../AppContext";
import {postService} from "../../_services/post.service";
import DisLike from "../buttons/DisLike";

const Post = (props) => {

    const [postLikes, setPostLikes] = useState([]);
    const [liked, setLiked] = useState();

    const uid = useContext(UidContext);

    useEffect(() => {
        postService.postLikes(props.post._id)
            .then(res => setPostLikes(res.data.likes))
            .catch(err => console.log(err));
    }, [liked])

    useEffect(() => {
        if (postLikes.includes(uid)) setLiked(true);
    });

    const handleLike = () => {
        if (postLikes.includes(uid)) {
            postService.deleteLikeFromPost(props.post._id, uid)
                .then(() => setLiked(false))
                .catch(err => console.log(err))
        } else {
            postService.addLike(props.post._id, uid)
                .then(() => setLiked(true))
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="post">
            <img src={require("./postImages/" + props.post.image_url)} alt={"postImage"}/>
            <div className="description">
                <p>{props.post.author}</p>
                <span>{props.post.description}</span>
            </div>
            <div className="buttons">
                <form className="postForm"
                      action={"/comments/" + props.post._id}>
                    <button type="submit">
                        <Comment/>
                    </button>
                </form>
                <button onClick={handleLike}>
                    {!liked && <Like likes={postLikes.length}/>}
                    {liked && <DisLike/>}
                </button>
            </div>
        </div>
    );
};

export default Post;