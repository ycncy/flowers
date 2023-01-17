import React, {useEffect} from 'react';
import {authService} from "../../_services/auth.service";
import {useNavigate} from "react-router-dom";

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        authService.logout();
        navigate('/');
    })

    return (
        <div>
        </div>
    );
};

export default Logout;