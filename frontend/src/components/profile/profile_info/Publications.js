const Publications = (props) => {

    if (props.publications) {
        return (
            <div>
                {props.publications.map((post, index) => {
                    return <p key={index}>{post.description}</p>
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