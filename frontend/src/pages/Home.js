import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import axios from "axios";

import {authService} from "../services/auth.service";

export function Home() {

    const navigate = useNavigate();

    const [elements, setElements] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/users/all-users', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => setElements(res.data))
            .catch(err => console.log(err));
    },)

    const logout = () => {
        authService.logout();
        navigate('/');
    }

    return (
        <div>
            <ul>
                {elements.map((user, index) => (
                    <li key={index}>
                        <p>{user.username}</p>
                    </li>
                ))}
            </ul>
            <button onClick={logout}>
                logout
            </button>
        </div>
    );
}