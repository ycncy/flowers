import React, {useState} from 'react';
import {postService} from "../../_services/post.service";
import {useParams} from "react-router-dom";

const CreatePost = () => {

    const uid = useParams()

    const [credentials, setCredentials] = useState({
        description: "",
        image_url: "flower.png"
    })

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const createPost = (e) => {
        e.preventDefault()
        postService.create({
            author: uid.uid,
            description: credentials.description,
            image_url: credentials.image_url
        }).then(() => {
            window.location = '/';
        }).catch(err => console.log(err));
    }

    return (
        <div className="createPost">
            <form onSubmit={createPost}>
                <h1>Créer un post</h1>
                <div className="group">
                    <h3>Description</h3>
                    <textarea name="description" value={credentials.description}
                              placeholder="Description" rows={10} cols={50}
                              onChange={onChange}/>
                </div>
                <div className="group">
                    <button>Créer</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;