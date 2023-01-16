import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Profile} from "./pages/Profile"
import {Home} from "./pages/Home"

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
