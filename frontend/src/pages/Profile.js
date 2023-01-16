import React, {useEffect, useState} from "react";

import {authService} from "../_services/auth.service";
import {userService} from "../_services/user.service";

export function Profile() {

    const [user, setUser] = useState({})

    useEffect(() => {
        userService.getUser(authService.getToken())
            .then(res => setUser(res.data.user))
            .catch(err => console.log(err));
    }, [user])

    return (
        <div>
            <p>{user.username}</p>
            <p>{user.email}</p>
        </div>
    );
}