import logo from './logo.svg';
import './App.css';
import CreateUser from "./createUser";
import Login from "./login";
import {Routes, Route,} from "react-router-dom";
import Home from "./components/Home";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<CreateUser/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/Home" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
