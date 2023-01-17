import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Profile} from "./pages/Profile"
import {Home} from "./pages/Home"
import AuthRouter from "./pages/auth/AuthRouter";

import './css/app.css'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route path="/profil/:username" element={<Profile/>}></Route>
                <Route path="/connexion/*" element={<AuthRouter/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
