const db = require("../database");

module.exports = async function handler(req, res) {
  if (req.method === "POST") {
    const { title, description, salary, skills, category } = req.body;

    db.run(
      `INSERT INTO jobs (title, description, salary, skills, category) VALUES (?, ?, ?, ?, ?)`,
      [title, description, salary, skills, category],
      function (err) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Failed to add job" });
        }
        return res.status(200).json({ id: this.lastID });
      }
    );
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
