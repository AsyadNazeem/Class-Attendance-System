import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform validation
        if (!formData.email || !formData.password) {
            setError("Please provide both email and password");
            return;
        }

        if (!validateEmail(formData.email)) {
            setError("Please provide a valid email address");
            return;
        }

        // Convert the form data to query parameters
        const queryParams = new URLSearchParams(formData).toString();

        // Send a POST request to your Express server with query parameters
        fetch(`https://clz_system.horapusa.me/api/user/login?${queryParams}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Login successful:", data);
                navigate('/Home')
            })
            .catch((error) => {
                console.error("Error logging in:", error);
                // Handle error condition
            });
    };

    const validateEmail = (email) => {
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="container">
            <h1 className="heading">Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label">Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <label className="label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="button">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
