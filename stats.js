const { Op } = require("sequelize");
const { GPA } = require("./constants");
const { sequelize, Section, Professor, Course } = require("./models");

exports.initStats = async (app) => {
  // setup professor list
  let professorList = await Professor.findAll({
    raw: true,
    attributes: ["InstructorFirst", "InstructorLast", "AvgGPA"],
  });

  professorList.forEach((prof) => (prof.label = prof.InstructorFirst + " " + prof.InstructorLast));
  console.log(professorList);

  // setup course list
  let courseList = await Course.findAll({
    raw: true,
    attributes: ["Subject", "CourseNumber", "AvgGPA"],
  });

  courseList.forEach((course) => (course.label = course.Subject + " " + course.CourseNumber));
  console.log(courseList);

  function removeNulls(obj) {
    for (atr of Object.keys(obj)) {
      if (obj[atr] == null) delete obj[atr];
    }
  }

  async function getAvgGPA(query) {
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

    return calcAvg(sections);
  }

  function calcAvg(sections) {
    let tEnrollment = 0;
    let tPoints = 0;
    for (let section of sections) {
      tEnrollment += section.TotalEnrollment;
      for (let grade of Object.keys(GPA)) {
        tPoints += GPA[grade] * section[grade];
      }
    }
    return tPoints / tEnrollment;
  }

  async function getSectionsByProfessor(first, last) {
    return await Section.findAll({ where: { InstructorFirst: first, InstructorLast: last } });
  }

  async function getSectionsByCourse(subject, courseNumber) {
    return await Section.findAll({ where: { Subject: subject, CourseNumber: courseNumber } });
  }

  app.get("/professorList", (req, res) => {
    res.send(professorList);
  });

  app.get("/courseList", (req, res) => {
    res.send(courseList);
  });

  app.post("/avgGPA", async (req, res) => {
    let gpa = await getAvgGPA(req.body);
    res.send({ gpa: gpa });
  });

  app.get("/subjectMap", async (req, res) => {
    res.send(subjectMap);
  });

  app.post("/professorSections", async (req, res) => {
    console.log(req.body);
    first = req.body.first;
    last = req.body.last;
    let sections = await getSectionsByProfessor(first, last);

    res.send(sections);
  });

  app.post("/courseSections", async (req, res) => {
    console.log(req.body);
    subject = req.body.subject;
    courseNumber = req.body.courseNumber;
    let course = await getSectionsByCourse(subject, courseNumber);

    res.send(course);
  });
};
