const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./pets.sqlite", function (err) {
  if (err) {
    console.log("Error connecting to database");
  } else {
    console.log("Database Connected: Pets");
  }
});

module.exports = db;
