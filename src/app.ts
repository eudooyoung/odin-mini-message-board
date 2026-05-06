const express = require("express");
const path = require("node:path");
const router = require("./routes/router");

const app = express();
const PORT = process.env.PORT;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extented: true }));

app.use("/", router);

app.listen(PORT, (error: Error) => {
  if (error) {
    throw error;
  }
});
