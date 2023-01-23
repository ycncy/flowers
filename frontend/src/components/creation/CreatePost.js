import React, {useState} from 'react';

const CreatePost = () => {

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

    return (
        <div className="createPost">
            <form>
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