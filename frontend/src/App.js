import logo from './logo.svg';
import './App.css';
import CreateUser from "./createUser";
import Login from "./login";
import {Routes, Route,} from "react-router-dom";
import Home from "./components/Home";
import Users from "./components/users";
import UpdateUser from "./components/updateUser";
import MarkAttendance from "./components/Attendance/MarkAttendance";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<CreateUser/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/users" element={<Users/>}/>
                {/*<Route path="/updateuser" element={<UpdateUser/>}/>*/}
                {/*<Route path="/markattendance" element={<MarkAttendance/>}/>*/}
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
