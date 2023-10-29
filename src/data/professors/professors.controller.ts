import { Body, Controller, Post } from '@nestjs/common';
import { Professor } from 'src/db/db';

@Controller()
export class ProfessorsController {
  constructor() {}

  @Post('find')
  async find(
    @Body() body: { InstructorFirst: string; InstructorLast: string },
  ) {
    const professors = await Professor.findAll({
      where: {
        LastName: body.InstructorLast,
        FirstName: body.InstructorFirst,
      },
    });
    return professors.map((professor) => {
      return {
        id: professor.id.valueOf(),
        InstructorFirst: professor.FirstName,
        InstructorLast: professor.LastName,
        TotalEnrollment: professor.GradePoints,
        AvgGPA: professor.AvgGPA,
        Label: professor.FirstName + ' ' + professor.LastName,
      };
    });
  }

  @Post('findAll')
  async findAll() {
    const professors = await Professor.findAll({});
    return professors.map((professor) => {
      return {
        id: professor.id.valueOf(),
        InstructorFirst: professor.FirstName,
        InstructorLast: professor.LastName,
        TotalEnrollment: professor.GradePoints,
        AvgGPA: professor.AvgGPA,
        Label: professor.FirstName + ' ' + professor.LastName,
      };
    });
  }
}
