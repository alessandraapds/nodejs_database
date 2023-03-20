const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

const pool = new Pool();

// Getting the list of users
router.get("/", (req, res) => {
  pool
    .query("SELECT * FROM users;")
    .then(({ rows }) => res.json(rows))
    .catch((e) => res.sendStatus(500));
});

// Getting an unique user per id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM users WHERE id=$1;", [id])
    .then(({ rows }) => res.json(rows))
    .catch((e) => res.sendStatus(500));
});

// Inserting a new user into the database
router.post("/", (req, res) => {
  const { first_name, last_name, age, active } = req.body;
  pool
    .query(
      "INSERT INTO users (first_name, last_name, age, active) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, age, active]
    )
    .then(({ rows }) => res.json(rows))
    .catch((e) => res.sendStatus(500));
});

// Updating a user
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { last_name } = req.body;
  pool
    .query("UPDATE users SET last_name=$1 WHERE id=$2 RETURNING *", [
      last_name,
      id,
    ])
    .then(({ rows }) => res.json(rows))
    .catch((e) => res.sendStatus(500));
});

// Deleting a user
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM users WHERE id=$1 RETURNING *", [id])
    .then(({ rows }) => res.json(rows))
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

module.exports = router;
