const express = require('express');
const router = express.Router();
const db = require('../database/index');


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  

  const stmt = db.prepare('select * from jobs where id = ?');
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

  const index = db.findIndex((j) => j.id === parseInt(id));

  if (index !== -1) {
    db[index] = { ...db[index], title, description, salary, skills, category };
    res.json({ message: "Job updated" });
  } else {
    res.status(404).json({ error: "Job not found" });
  }
});

module.exports = router;
