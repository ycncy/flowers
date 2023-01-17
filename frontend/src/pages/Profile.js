import ProfileNav from "../components/profile/ProfileNav";
import ProfileInformations from "../components/profile/ProfileInformations";

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