import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

import {authService} from "../../_services/auth.service";

const Register = () => {
    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: ""
    })

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault();
        authService.register(credentials)
            .then(res => {
                    authService.saveToken(res.data.token);
                navigate("/connexion/login");
                }
            )
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={register}>
            <div className="group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" name="username" value={credentials.username}
                       onChange={onChange}/>
            </div>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={credentials.email}
                       onChange={onChange}/>
            </div>
            <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password"
                       value={credentials.password} onChange={onChange}/>
            </div>
            <div className="group">
                <button>S'inscrire</button>
            </div>
        </form>
    );
};

export default Register;