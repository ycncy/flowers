import React, {useEffect, useState} from "react";

import ProfileNav from "../components/profile/ProfileNav";
import ProfileInformations from "../components/profile/ProfileInformations";
import {userService} from "../_services/user.service";
import {useParams} from "react-router-dom";

export function Profile() {

    const {username} = useParams();

    return (
        <div>
            <ProfileNav/>
            <ProfileInformations username={username}/>
        </div>
    );
}