import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteQuery, setDeleteQuery] = useState("");

    useEffect(() => {
        axios
            .get("https://clz_system.horapusa.me/getAllUsers")
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get(`https://clz_system.horapusa.me/getUser?email=${searchQuery}`)
            .then((response) => {
                setSearch(response.data);
            })
            .catch((err) => console.log(err));
    }, [searchQuery]);

    function searchItems() {
        axios
            .get(`https://clz_system.horapusa.me/getUser?email=${searchQuery}`)
            .then((response) => {
                setSearch(response.data);
            })
            .catch((err) => console.log(err));
    }

    function deleteItem() {
        axios
            .delete(`https://clz_system.horapusa.me/deleteUser?email=${deleteQuery}`)
            .then((response) => {
                // Update the users state after successful deletion
                setUsers((prevUsers) =>
                    prevUsers.filter((user) => user.email !== deleteQuery)
                );
            })
            .catch((err) => console.log(err));
    }

    return (
        <div>
            <h1>Users</h1>
            <div className="user-container">
                <div className="search-user">
                    <input
                        type="text"
                        placeholder="email address"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div>
                        <button className="search-user-btn" onClick={searchItems}>
                            Search
                        </button>
                        <button className="delete-user-btn" onClick={deleteItem}>
                            Delete
                        </button>
                    </div>
                </div>

                <table className="user-table">
                    <thead>
                    <tr>
                        <th>FIRST NAME</th>
                        <th>LAST NAME</th>
                        <th>PHONE NUMBER</th>
                        <th>EMAIL</th>
                        <th>USER TYPE</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.userType}</td>
                        </tr>
                    ))}
                    {search.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.userType}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}