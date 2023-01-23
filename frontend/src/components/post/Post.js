import './post.css'

import Like from "../buttons/Like";
import Comment from "../buttons/Comment";

import {useContext, useEffect, useState} from "react";

import {UidContext} from "../AppContext";
import {postService} from "../../_services/post.service";
import DisLike from "../buttons/DisLike";

const Post = (props) => {

    console.log(props.post)

    const [postLikes, setPostLikes] = useState([]);
    const [liked, setLiked] = useState();

    const uid = useContext(UidContext);

    const likes = async () => {
        await postService.postLikes(props.post._id)
            .then(res => setPostLikes(res.data.likes))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        likes();
    }, [postLikes])

    const handleLike = async () => {
        if (postLikes.includes(uid)) {
            await postService.deleteLikeFromPost(props.post._id, uid)
                .then(() => setLiked(false))
                .catch(err => console.log(err))
        } else {
            await postService.addLike(props.post._id, uid)
                .then(() => setLiked(true))
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="post">
            <img src={require("./postImages/" + props.post.image_url)}/>
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
                    {!liked && <Like/>}
                    {liked && <DisLike/>}
                </button>
            </div>
        </div>
    );
};

export default Post;