import React from 'react';

const Followers = (props) => {
    return (
        <div>
            {props.followers.map((follower, index) => {
                return <p key={index}>{follower}</p>
            })}
        </div>
    );
};

export default Followers;