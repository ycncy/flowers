import React from 'react';

const Following = (props) => {
    return (
        <div>
            {props.following.map((user, index) => {
                return <p key={index}>{user}</p>
            })}
        </div>
    );
};

export default Following;