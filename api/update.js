const express = require("express");
const router = express.Router();
const db = require("../database");

// router.get("/", (req, res) => {
//   db.all(`SELECT * FROM jobs`, [], (err, rows) => {
//     if (err) {
//       console.error("Database fetch error:", err);
//       res.status(500).json({ error: "Failed to fetch jobs" });
//     } else {
//       res.status(200).json(rows);
//     }
//   });
// });

router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  db.get(`SELECT * FROM jobs WHERE id = ?`, [id], (err, row) => {
    if (err) {
      console.error("Error fetching job:", err);
      res.status(500).json({ error: "Failed to retrieve job" });
    } else if (!row) {
      res.status(404).json({ error: "Job not found" });
    } else {
      res.status(200).json(row);
    }
  });
});

router.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, salary, skills, category } = req.body;

  console.log("Received data:", { title, description, salary, skills, category });

  db.run(
    `UPDATE jobs
     SET title = ?, description = ?, salary = ?, skills = ?, category = ?
     WHERE id = ?`,
    [title, description, salary, skills, category, id],
    function (err) {
      if (err) {
        console.error("Error updating job:", err);
        return res.status(500).json({ error: "Failed to update job" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.status(200).json({ message: "Job updated successfully" });
    }
  );
});



module.exports = router;
