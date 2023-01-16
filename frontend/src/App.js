import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Profile} from "./pages/Profile"
import {Home} from "./pages/Home"

import AuthRouter from "./pages/auth/AuthRouter";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="/auth/*" element={<AuthRouter/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
