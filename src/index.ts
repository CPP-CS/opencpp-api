import { PrismaClient } from "@prisma/client";
export let prismaClient = new PrismaClient();

import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
export let app = express();

import cors from "cors";
import compression from "compression";
import { initData } from "./data";
import { initConstants } from "./constants";

app.use(compression());
app.use(cors());
app.use(express.json());
// log all paths called
app.use((req, res, next) => {
  console.log("Path called:", req.path);
  next();
});
// error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
});

let initApp = async () => {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  await initData();
  await initConstants();

  app.listen(process.env.PORT || 3000, () => console.log("app started"));
};

// prevents crash on uncaught error
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught error", err);
  // process.exit(1);
});

initApp()
  .catch((e) => {
    console.log("Error starting app", e);
  })
  .finally(() => prismaClient.$disconnect());
