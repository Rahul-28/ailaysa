const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const app = express();

// To handle CORS issues
app.use(cors());

// To read JSON data from http requests
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

app.post("/insert", (req, res) => {
  const { id, title } = req.body;
  const query = "INSERT INTO squares (id, title) VALUES (?, ?)";
  db.query(query, [id, title], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error adding square", error: err });
    } else {
      res
        .status(200)
        .json({ message: "Square added successfully", id: result.insertId });
    }
  });
});

app.get("/max-id", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM squares";
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error retrieving count", error: err });
    } else {
      const maxId = result[0].count || 0;
      res.status(200).json({ maxId });
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  // Delete the square
  const deleteQuery = "DELETE FROM squares WHERE id = ?";
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error deleting square", error: err });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ message: "Square not found" });
    } else {
      // Reassign the IDs of the remaining squares
      const reassignQuery =
        "SET @count = 0; UPDATE squares SET id = (@count := @count + 1)";
      db.query(reassignQuery, (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error reassigning IDs", error: err });
        } else {
          res.status(200).json({
            message: "Square deleted and IDs reassigned successfully",
          });
        }
      });
    }
  });
});

app.get("/get/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM squares WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error retrieving square", error: err });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Square not found" });
    }
    res.status(200).json(result[0]);
  });
});

app.get("/getAll", (req, res) => {
  const query = "SELECT * FROM squares";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error retrieving squares", error: err });
    } else {
      res.status(200).json(results);
    }
  });
});

module.exports = app;
