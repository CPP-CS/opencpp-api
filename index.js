require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { Section } = require("./models");
const { query } = require("express");
const { Op } = require("sequelize");
const { gpa, subjectMap } = require("./constants");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

function removeNulls(obj) {
  for (atr of Object.keys(obj)) {
    if (obj[atr] == null) delete obj[atr];
  }
}

async function avgGPA(query) {
  let where = {
    Subject: query.subject,
    CourseNumber: query.courseNumber,
    InstructorFirst: query.instructorFirst,
    InstructorLast: query.instructorLast,
    Term: query.term,
    InstructionMode: query.instructionMode,
    A: {
      [Op.ne]: null,
    },
  };
  removeNulls(where);
  let sections = await Section.findAll({
    attributes: ["TotalEnrollment", "A", "A-", "B", "B+", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"],
    where: where,
  });

  let tEnrollment = 0;
  let tPoints = 0;
  for (let section of sections) {
    tEnrollment += section.TotalEnrollment;
    for (let grade of Object.keys(gpa)) {
      tPoints += gpa[grade] * section[grade];
    }
  }
  return tPoints / tEnrollment;
}

app.post("/avgGPA", async (req, res) => {
  let gpa = await avgGPA(req.body);
  res.send({ gpa: gpa });
});

app.get("/subjectMap", async (req, res) => {
  res.send(subjectMap);
});

app.listen(3000, () => console.log("app started"));
