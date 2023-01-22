import './post.css'
import {postService} from "../../_services/post.service";
import {userService} from "../../_services/user.service";

const Post = (props) => {

    const handleLike = async () => {
        await userService.getUserByToken(localStorage.getItem("token"))
            .then(async res => {
                const user = res.data.response._id;

                await postService.addLike(props.post._id, user)
                    .then(res => {
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="post">
            <img src={require("./postImages/" + props.post.image_url)}/>
            <div className="description">
                <a href={"/profil/" + props.post.author}>{props.post.author}</a>
                <span>{props.post.description}</span>
            </div>
            <div className="buttons">
                <a href={"/comments/" + props.post._id}>
                    <img src={require("./postImages/comment.png")}/>
                </a>
                <button onClick={handleLike}>
                    <img src={require("./postImages/like.png")}/>
                </button>
            </div>
        </div>
    );
};

export default Post;