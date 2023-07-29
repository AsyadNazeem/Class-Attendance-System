const express = require("express");
const axios = require("axios");
const cors = require("cors");
const {response} = require("express");

const app = express();
const port = 3005;
const FASTAPI_URL = 'http://174.138.23.76:8000';

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
}));

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// });

app.post("/createUser", async (req, res) => {
    try {
        const formData = req.body;
        // Make a POST request to the FastAPI backend with 'no-cors' mode
        const response = await axios.post(`${FASTAPI_URL}/createUser`, formData);
        console.log("User created:", response.data);
        // Perform any necessary actions after successful user creation
        res.json(response.data);
    } catch (error) {
        console.error("Error creating user:", error);
        // Handle error condition
        res.status(500).json({error: "Failed to create user"});
    }
});


app.post("/user/login", (req, res) => {
    const {email, password} = req.body;

    // Make a POST request to the FastAPI backend for login with 'no-cors' mode
    axios
        .post("http://174.138.23.76:8000/user/login", {email, password})
        .then((response) => {
            console.log("Login successful:", response.data);
            // Perform any necessary actions after successful login
            res.status(200).json(response.data);
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.detail) {
                console.error("Error logging in:", error.response.data.detail);
            } else {
                console.error("Error logging in:", error.message);
            }
            // Handle error condition
            res.status(500).json({error: "Failed to log in"});
        });
});


app.get("/getAllUsers", async (req, res) => {
    try {
        const url = `${FASTAPI_URL}/getAllUsers`;
        const response = await axios.get(url);
        if (response.data) {
            res.json(response.data);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch data"});
    }
});

app.get(`/user/:email`, async function (req, res) {
    try {
        const email = req.params.email;
        const url = `http://174.138.23.76:8000/getUser?email=${email}`; // main change
        const response = await axios.get(url);
        if (response.data) {
            res.json(response.data);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch data"});
    }
});


app.get("/deleteUser/:email", async (req, res) => {
    try {
        const email = req.params.email;
        const url = `http://174.138.23.76:8000/deleteUser?email=${email}`;
        const response = await axios.get(url);
        if (response.data) {
            res.json(response.data);
        } else {
            res.status(404).json({error: 'User not found'});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete user"});
    }
});

app.post("/updateUser", (req, res) => {
    const updateData = req.body;
    axios
        .post('http://174.138.23.76:8000/updateUser', updateData)
        .then((response) => {
            console.log("User Updated:", response.data);

            res.status(200).json(response.data);
        })
        .catch((error) => {
            console.error("Error Updating user:", error);

            res.status(500).json({error: "Failed to Update user"})
        })
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
})

