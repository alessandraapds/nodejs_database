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

module.exports = router;
