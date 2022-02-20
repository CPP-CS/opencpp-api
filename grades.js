const { sequelize, Section } = require("./models");

exports.initGrades = async (app) => {
  let res = await sequelize.query("SELECT DISTINCT `InstructorFirst`, `InstructorLast` FROM database.sections", {
    model: Section,
    mapToModel: true,
  });
  let professorList = res.map((professor) => {
    return { first: professor.InstructorFirst, last: professor.InstructorLast };
  });
  console.log(professorList);

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

  app.get("/professorList", (req, res) => {
    res.send(professorList);
  });

  app.post("/avgGPA", async (req, res) => {
    let gpa = await avgGPA(req.body);
    res.send({ gpa: gpa });
  });

  app.get("/subjectMap", async (req, res) => {
    res.send(subjectMap);
  });
};
