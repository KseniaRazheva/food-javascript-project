const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  fs.readFile("db.json", (error, data) => {
    if (error) res.send("error readFile");
    res.send(data.toString());
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});