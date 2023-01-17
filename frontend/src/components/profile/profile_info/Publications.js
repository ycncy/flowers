const Publications = (props) => {

    return (
        <div>
            {props.publications.map((post, index) => {
                return <p key={index}>{post.description}</p>
            })}
        </div>
    );
};

export default Publications;