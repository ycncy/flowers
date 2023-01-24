import '../css/mainpage.css'
import {postService} from "../_services/post.service";
import {useState} from "react";
import Post from "../components/post/Post";

const MainPage = () => {

    const [posts, setPosts] = useState([]);

    postService.allPosts()
        .then(res => setPosts(res.data.response))
        .catch(err => console.log(err))

    return (
        <div className={"corps"}>
            {posts.map((post, index) => {
                return <Post key={index} post={post}/>
            })}
        </div>
    )
};

export default MainPage;