const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const pool = new Pool();

// Getting the list of orders
router.get("/", (req, res) => {
  pool
    .query("SELECT * FROM orders")
    .then(({ rows }) => res.json(rows))
    .catch((e) => res.sendStatus(500));
});

// Getting  one order (with the id)
router.get("/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("SELECT * FROM orders WHERE id=$1", [id])
    .then(({ rows }) => res.json(rows))
    .catch((e) => res.sendStatus(500));
});

// Creating a new order
router.post("/", (req, res) => {
  const { price, date, user_id } = req.body;
  pool
    .query(
      "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *",
      [price, date, user_id]
    )
    .then(({ rows }) => res.json(rows))
    .catch((e) => res.sendStatus(500));
});

// edit one order (with the id)
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { user_id } = req.body;
  pool
    .query("UPDATE orders SET user_id=$1 WHERE id=$2 RETURNING *", [
      user_id,
      id,
    ])
    .then(({ rows }) => res.json(rows))
    .catch((e) => res.sendStatus(500));
});

// deleting an order
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM orders WHERE id=$1 RETURNING *", [id])
    .then(({ rows }) => res.json(rows))
    .catch((e) => {
      console.log(e);
      res.sendStatus(500);
    });
});

module.exports = router;
