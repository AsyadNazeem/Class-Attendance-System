import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function UpdateUser() {
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        userType: "",
        password: "",
        isVerify: "",
        phoneNumber: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ""});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updateQueryParams = new URLSearchParams(updateData).toString();

        // Send a POST request to your Express server with query parameters
        fetch(`https://clz_system.horapusa.me/updateUser?${updateQueryParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User created:", data);
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                // Handle error condition
            });
    };

    return (
        <div className="update-user">
            <h1>Update User</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-Update-user">
                    <div className="update-form-group">
                        <label className="label">email</label>
                        <input
                            type="text"
                            name="email"
                            value={updateData.email}
                            onChange={handleChange}
                            className="Update-input"
                        />
                    </div>
                    <div className="update-form-group">
                        <label className="label">firstName</label>
                        <input
                            type="text"
                            name="firstName"
                            value={updateData.firstName}
                            onChange={handleChange}
                            className="Update-input"
                        />
                    </div>
                    <div className="update-form-group">
                        <label className="label">lastName</label>
                        <input
                            type="text"
                            name="lastName"
                            value={updateData.lastName}
                            onChange={handleChange}
                            className="Update-input"
                        />
                    </div>
                    <div className="update-form-group">
                        <label className="label">userType</label>
                        <input
                            type="text"
                            name="userType"
                            value={updateData.userType}
                            onChange={handleChange}
                            className="Update-input"
                        />
                    </div>
                    <div className="update-form-group">
                        <label className="label">password</label>
                        <input
                            type="text"
                            name="password"
                            value={updateData.password}
                            onChange={handleChange}
                            className="Update-input"
                        />
                    </div>
                    <div className="update-form-group">
                        <label className="label">isVerify</label>
                        <input
                            type="text"
                            name="isVerify"
                            value={updateData.isVerify}
                            onChange={handleChange}
                            className="Update-input"
                        />
                    </div>
                    <div className="update-form-group">
                        <label className="label">phoneNumber</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updateData.phoneNumber}
                            onChange={handleChange}
                            className="Update-input"
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}