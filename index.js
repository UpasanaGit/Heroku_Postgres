// Add required packages
const express = require("express");
const app = express();

// Enable CORS (see https://enable-cors.org/server_expressjs.html)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// include the env file for database url
// env file is like property file in java
require('dotenv').config();

// Set up EJS
app.set("view engine", "ejs");

// Add database package and connection string (can remove ssl)
const {
    Pool
} = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Start listener
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started (http://localhost:3000/) !");
});

// Setup routes
app.get("/", (req, res) => {
    //res.send ("Hello world...");
    const sql = "SELECT * FROM PRODUCT ORDER BY PROD_ID";
    pool.query(sql, [], (err, result) => {
        var message = "";
        var model = {};
        if (err) {
            message = `Error - ${err.message}`;
        } else {
            message = "success";
            model = result.rows;
        };
        res.render("home", {
            message: message,
            model: model
        });
    });
});