import type types = require("./types");

const express = require("express");
const path = require("node:path");

const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", ({ req, res }: types.MiddleWare) => {
  res.render("index", { banner: "Home" });
});

app.listen(PORT, (error: Error) => {
  if (error) {
    throw error;
  }
});
