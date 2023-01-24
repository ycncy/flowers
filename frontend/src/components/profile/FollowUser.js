import React, {useState} from 'react';
import {userService} from "../../_services/user.service";

const FollowUser = (props) => {

    const [userDetail, setUserDetail] = useState();

    userService.getUserById(props.id)
        .then(res => setUserDetail({
            username: res.data.username,
            picture: res.data.profil_pic_url
        }))
        .catch(err => console.log(err))

    if (userDetail) {
        return (
            <div className="userDetail">
                <img src={require("../../images/" + userDetail.picture)} alt={"profil_pic"}/>
                <h1>{userDetail.username}</h1>
            </div>
        );
    }
};

export default FollowUser;