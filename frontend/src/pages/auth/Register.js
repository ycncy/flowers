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
            <h1>S'inscrire</h1>
            <div className="group">
                <input type="text" name="username" value={credentials.username}
                       placeholder="Nom d'utilisateur"
                       onChange={onChange}/>
                <label htmlFor="username">Minimum 3 caractères</label>
            </div>
            <div className="group">
                <input type="text" name="email" value={credentials.email}
                       placeholder="Adresse mail"
                       onChange={onChange}/>
            </div>
            <div className="group">
                <input type="password" name="password"
                       placeholder="Mot de passe"
                       value={credentials.password} onChange={onChange}/>
                <label htmlFor="username">Minimum 8 caractères</label>
            </div>
            <div className="group">
                <button>S'inscrire</button>
            </div>
        </form>
    );
};

export default Register;