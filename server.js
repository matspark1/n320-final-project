const express = require("express");
const path = require("path");
const app = express();

// require('./api/update')(app);

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

app.get("/edit-job/:id", function (req,res){
  res.sendFile(path.join(__dirname, "views", "edit-job", "index.html"));
});
app.get("/delete-job/:id", function (req,res){
  res.sendFile(path.join(__dirname, "views", "delete-job", "index.html"));
});

app.get("/job-pdf-generator", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "jobPDFGenerator.html"));
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




app.get("/*page.html", function (req, res) {
  res.redirect("/404.html");
});

const port = process.env.PORT || 13883;

app.listen(port);

console.log(`Server running: http://localhost:${port}`);