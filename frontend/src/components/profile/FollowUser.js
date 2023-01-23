import React, {useEffect, useState} from 'react';
import {userService} from "../../_services/user.service";
import {Link} from "react-router-dom";

const FollowUser = (props) => {

    const [userDetail, setUserDetail] = useState();

    const fetchUser = async () => {
        await userService.getUserById(props.id)
            .then(res => setUserDetail({
                username: res.data.username,
                picture: res.data.profil_pic_url
            }))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchUser();
    }, [props])

    if (userDetail) {
        return (
            <div className="userDetail">
                <img src={require("../../images/" + userDetail.picture)}/>
                <h1>{userDetail.username}</h1>
            </div>
        );
    }
};

export default FollowUser;