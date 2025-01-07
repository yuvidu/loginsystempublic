// backend/server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a connection pool to MariaDB
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test DB connection
db.getConnection((err) => {
  if (err) {
    console.error("DB connection failed:", err.stack);
    return;
  }
  console.log("Connected to database!");
});

// Routes

// User login route
app.post("/login", (req, res) => {
  const { user_name, password } = req.body;
  const query = "SELECT * FROM user_master WHERE user_name = ? AND password = ?";
  
  db.query(query, [user_name, password], (err, results) => {
    if (err) {
      res.status(500).send("Error querying the database.");
      return;
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(401).send("Invalid credentials.");
    }
  });
});

// User information route (to get user details)
app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM employee_master WHERE id = ?";

  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).send("Error querying the database.");
      return;
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).send("User not found.");
    }
  });
});



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
