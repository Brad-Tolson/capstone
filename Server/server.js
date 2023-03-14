const express = require("express");
const app = express();
const path = require("path");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/index.html"));
});

app.get("/css", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/styles.css"));
});

app.get("/js", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/script.js"));
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});

  
