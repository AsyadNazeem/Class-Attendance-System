import React, {useState, useEffect} from "react";
import axios from "axios";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3005/getAllUsers');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch data");
                setLoading(false);
            }
        }

        fetchUsers();
    }, []);


    const handleSearchClick = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/user/${email}`);
            setSearch([response.data]);
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch data");
            setLoading(false);
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.get(`http://localhost:3005/deleteUser/${email}`);
            console.log(response.data)
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch data");
            setLoading(false);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Users</h1>
            <div className="user-container">
                <div className="search-user">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="search-user-btn" onClick={handleSearchClick}>
                        Search
                    </button>
                    <div>
                        <button className="delete-user-btn" onClick={handleDelete}>
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
                    {search.length > 0 ?
                        search.map((search) => (
                            <tr key={search.id}>
                                <td>{search.firstName}</td>
                                <td>{search.lastName}</td>
                                <td>{search.phoneNumber}</td>
                                <td>{search.email}</td>
                                <td>{search.userType}</td>
                            </tr>
                        ))
                        : users.map((user) => (
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