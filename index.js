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

  app.listen(process.env.PORT || 3000, () => console.log("app started"));
};

// prevents crash on uncaught error
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  // process.exit(1);
});

initApp();
