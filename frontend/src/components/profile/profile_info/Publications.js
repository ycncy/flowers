import '../profileInformations.css'
import Post from "../../post/Post";

const Publications = (props) => {

    if (props.publications.length !== 0) {
        return (
            <div className="publications">
                {props.publications.map((post, index) => {
                    return <Post key={index} post={post}/>
                })}
            </div>
        );
    }
    return <div>
        <h1>Aucune publication</h1>
        <h3>Rendez-vous sur la page de création pour publier votre premier post
            !</h3>
    </div>
};

export default Publications;