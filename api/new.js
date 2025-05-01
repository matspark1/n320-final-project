const express = require("express");
const router = express.Router();
const db = require("../database");

router.get("/", (req, res) => {
  db.all(`SELECT * FROM jobs`, [], (err, rows) => {
    if (err) {
      console.error("Database fetch error:", err);
      res.status(500).json({ error: "Failed to fetch jobs" });
    } else {
      res.status(200).json(rows);
    }
  });
});

router.post("/add", (req, res) => {
  const { title, description, salary, skills, category } = req.body;

  if (title && description && salary && skills && category) {
    const query = `
      INSERT INTO jobs (title, description, salary, skills, category)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [title, description, parseInt(salary), skills, category];

    db.run(query, values, function (err) {
      if (err) {
        console.error("Database insert error:", err);
        res.status(500).json({ error: "Failed to add job" });
      } else {
        res.status(201).json({ id: this.lastID, ...req.body });
      }
    });
  } else {
    res.status(400).json({ error: "Please fill out all fields." });
  }
});

module.exports = router;
