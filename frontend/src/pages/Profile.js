import ProfileInformations from "../components/profile/ProfileInformations";

import {useParams} from "react-router-dom";
import Navbar from "../components/nav/Navbar";

export function Profile() {

    const username = useParams();

    return (
        <div>
            <Navbar/>
            <ProfileInformations username={username}/>
        </div>
    );
}