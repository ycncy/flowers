import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import {authService} from "../../_services/auth.service";

const Login = () => {

    let navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        if (authService.isLogged()) authService.logout();
        authService.login(credentials)
            .then(res => {
                    authService.saveToken(res.data.token);
                    navigate("/");
                }
            )
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={login}>
            <div className="group">
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" name="username" value={credentials.username}
                       onChange={onChange}/>
            </div>
            <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password"
                       value={credentials.password} onChange={onChange}/>
            </div>
            <div className="group">
                <button>Se connecter</button>
            </div>
        </form>
    );
};

export default Login;