require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { Section } = require("./models");
const { query } = require("express");
const { Op } = require("sequelize");
const { gpa, subjectMap } = require("./constants");
const { initGrades, initStats } = require("./stats");

app.use(cors());
app.use(express.json());

let initApp = async () => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  initStats(app);

  app.listen(3000, () => console.log("app started"));
};

initApp();
