require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const { initStats } = require("./stats");

app.use(compression());
app.use(cors());
app.use(express.json());

let initApp = async () => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  await initStats(app);

  app.listen(3000, () => console.log("app started"));
};

initApp();
