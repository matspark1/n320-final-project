const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./oddjobs.sqlite", function (err) {
  if (err) {
    console.log("Error connecting to database");
  } else {
    console.log("Database Connected: oddJobs");
  }
});

module.exports = db;
