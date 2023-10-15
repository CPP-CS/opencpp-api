import { Controller, Post, Body } from '@nestjs/common';
import { Course, Instruction, Professor, Subject } from 'src/db/db';

@Controller()
export class InstructionsController {
  constructor() {}

  @Post('findByCourse')
  async findByCourse(@Body() body: { CourseNumber: string; Subject: string }) {
    const instructions = await Instruction.findAll({
      include: [
        {
          model: Course,
          where: {
            CourseNumber: body.CourseNumber as string,
          },
          as: 'course',
          include: [
            {
              model: Subject,
              where: {
                Name: body.Subject,
              },
              as: 'subject',
            },
          ],
        },
        {
          model: Professor,
          as: 'professor',
        },
      ],
    });
    return instructions.map((instruction) => {
      return {
        id: instruction.id.valueOf(),
        Subject: instruction.course?.subject?.Name,
        CourseNumber: instruction.course?.CourseNumber,
        InstructorFirst: instruction.professor?.FirstName || 'Error',
        InstructorLast: instruction.professor?.LastName?.valueOf() || 'Error',
        instruction: instruction.GradePoints,
        AvgGPA: instruction.AvgGPA,
        TotalEnrollment: instruction.GradePoints,
        courseId: instruction.CourseId.valueOf(),
        instructorId: instruction.ProfessorId.valueOf(),
      };
    });
  }

  @Post('findByProfessor')
  async findByProfessor(
    @Body() body: { InstructorFirst: string; InstructorLast: string },
  ) {
    const instructions = await Instruction.findAll({
      include: [
        {
          model: Course,
          as: 'course',
          include: [
            {
              model: Subject,
              as: 'subject',
            },
          ],
        },
        {
          model: Professor,
          where: {
            FirstName: body.InstructorFirst,
            LastName: body.InstructorLast,
          },
          as: 'professor',
        },
      ],
    });
    return instructions.map((instruction) => {
      return {
        id: instruction.id.valueOf(),
        Subject: instruction.course?.subject?.Name,
        CourseNumber: instruction.course?.CourseNumber,
        InstructorFirst: instruction.professor?.FirstName || 'Error',
        InstructorLast: instruction.professor?.LastName?.valueOf() || 'Error',
        TotalEnrollment: instruction.GradePoints,
        AvgGPA: instruction.AvgGPA,
        courseId: instruction.CourseId.valueOf(),
        instructorId: instruction.ProfessorId.valueOf(),
      };
    });
  }
}
