import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        userType: "",
        password: "",
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation
        const validationErrors = {};

        if (!formData.firstName) {
            validationErrors.firstName = "First Name is required";
        }

        if (!formData.lastName) {
            validationErrors.lastName = "Last Name is required";
        }

        if (!formData.phoneNumber) {
            validationErrors.phoneNumber = "Phone Number is required";
        }

        if (!formData.email) {
            validationErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            validationErrors.email = "Please enter a valid email address";
        }

        if (!formData.userType) {
            validationErrors.userType = "User Type is required";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required";
        }

        // Check if there are any validation errors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Convert the form data to query parameters
        const queryParams = new URLSearchParams(formData).toString();

        // Send a POST request to your Express server with query parameters
        fetch(`https://clz_system.horapusa.me/createUser?${queryParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("User created:", data);
                navigate('/login')
            })
            .catch((error) => {
                console.error("Error creating user:", error);
                // Handle error condition
            });
    };

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="create-user-container">
            <h1>Create User</h1>
            <div className="create-user-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="create-user-label">First Name:</label>
                        <input
                            type="text"
                            className="create-user-input"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label className="create-user-label">Last Name:</label>
                        <input
                            type="text"
                            className="create-user-input"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                    <div>
                        <label className="create-user-label">Phone Number:</label>
                        <input
                            type="text"
                            className="create-user-input"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                    </div>
                    <div>
                        <label className="create-user-label">Email:</label>
                        <input
                            type="text"
                            className="create-user-input"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="create-user-label">UserType:</label>
                        <input
                            type="text"
                            className="create-user-input"
                            name="userType"
                            value={formData.userType}
                            onChange={handleChange}
                        />
                        {errors.userType && <p className="error">{errors.userType}</p>}
                    </div>
                    <div>
                        <label className="create-user-label">Password:</label>
                        <input
                            type="password"
                            className="create-user-input"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button type="submit" className="create-user-submit">
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
}
