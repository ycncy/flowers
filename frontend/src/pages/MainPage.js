import React, {useEffect, useState} from 'react';
import {userService} from "../_services/user.service";

const MainPage = (props) => {

    const [username, setUsername] = useState('');

    useEffect(() => {
        userService.getUserByToken(props.token)
            .then(res => setUsername(res.data.user.username))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="corps">
            {username}
        </div>
    );
};

export default MainPage;