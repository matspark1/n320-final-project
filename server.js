const express = require("express");
const path = require("path");

// Create an express app
const app = express();

app.use(express.json());

app.use("/api", require("./api"));

app.use(
  express.static(
    path.join(__dirname, "views") //
  )
);

app.get("/job-details/:id", function (req, res) {
  res.sendFile(path.join(__dirname, "views", "job-details", "index.html"));
});

app.get(
  "/contact",
  function (req, res, next) {
    console.log(req.query);
    next();
  },
  function (req, res, next) {
    res.send("<p>Limit</p>");
  }
);
app.delete("/api/suggestions/remove/:id", (req, res) => {
  const suggestionId = req.params.id;

  const index = suggestions.findIndex(suggestion => suggestion.id === suggestionId);
  if (index !== -1) {
    suggestions.splice(index, 1);
    res.status(200).send({ message: "Suggestion deleted successfully." });
  } else {
    res.status(404).send({ message: "Suggestion not found." });
  }
});

app.get("/*page.html", function (req, res) {
  res.redirect("/404.html");
});

const port = process.env.PORT || 13883;

app.listen(port);

console.log(`Server running: http://localhost:${port}`);