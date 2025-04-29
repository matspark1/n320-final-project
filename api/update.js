const express = require("express");
const router = express.Router();
const db = require("../database/index");

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const stmt = db.prepare("select * from jobs where id = ?");
  const job = stmt.get(id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, salary, skills, category } = req.body;

  const stmt = db.prepare(`
    UPDATE jobs SET title = ?, description = ?, salary = ?, skills = ?, category = ?
    WHERE id = ?
  `);
  const result = stmt.run(title, description, salary, skills, category, id);

  if (result.changes > 0) {
    res.json({ message: "Job updated" });
  } else {
    res.status(404).json({ error: "Job not found or not updated" });
  }
});

module.exports = router;
