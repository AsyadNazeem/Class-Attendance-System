const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 8700;

app.use(express.json());
app.use(cors());

// Create an Axios instance with 'no-cors' mode
const axiosNoCors = axios.create({ mode: "no-cors" });

app.post("/createUser", (req, res) => {
    const userData = req.body;

    //https://clz_system.horapusa.me/createUser?firstName=kings&lastName=layer&phoneNumber=0772243454&email=kingslayer%40gmail.com&userType=admin&password=123456677'
    // Make a POST request to the FastAPI backend with 'no-cors' mode
    axiosNoCors
        .post("https://clz_system.horapusa.me/createUser", userData)
        .then((response) => {
            console.log("User created:", response.data);
            // Perform any necessary actions after successful user creation
            res.status(200).json(response.data);
        })
        .catch((error) => {
            console.error("Error creating user:", error);
            // Handle error condition
            res.status(500).json({ error: "Failed to create user" });
        });
});

app.post("/api/user/login", (req, res) => {
    const { email, password } = req.body;

    // Make a POST request to the FastAPI backend for login with 'no-cors' mode
    axiosNoCors
        .post("https://clz_system.horapusa.me/docs#/api/user/login", { email, password })
        .then((response) => {
            console.log("Login successful:", response.data);
            // Perform any necessary actions after successful login
            res.status(200).json(response.data);
        })
        .catch((error) => {
            console.error("Error logging in:", error);
            // Handle error condition
            res.status(500).json({ error: "Failed to log in" });
        });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:8700`);
});
