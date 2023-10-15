import { Body, Controller, Post } from '@nestjs/common';
import {
  Course,
  Event,
  GradeData,
  Instruction,
  Location,
  Professor,
  Section,
  Subject,
  Term,
} from 'src/db/db';

@Controller()
export class SectionsController {
  constructor() {}

  @Post('find')
  async findAll(
    @Body() body: { Term: string; Subject: string; CourseNumber: string },
  ) {
    const sections = await Section.findAll({
      include: [
        {
          model: Instruction,
          as: 'instruction',
          required: true,
          include: [
            {
              model: Course,
              as: 'course',
              required: true,

              where: {
                CourseNumber: body.CourseNumber,
              },
              include: [
                {
                  model: Subject,
                  as: 'subject',
                  required: true,

                  where: {
                    Name: body.Subject,
                  },
                },
              ],
            },
            {
              model: Professor,
              as: 'professor',
              required: true,
            },
          ],
        },
        {
          model: Event,
          as: 'event',
          include: [
            {
              model: Location,
              as: 'location',
            },
          ],
        },
        {
          model: Term,
          as: 'term',
          required: true,
          where: {
            TermName: body.Term,
          },
        },
        { model: GradeData, as: 'gradeData' },
      ],
    });
    return sections.map((section) => {
      console.log(section);
      const { instruction, event, term, gradeData } = section;
      console.log(event);
      return {
        id: section.id.valueOf(),
        ClassCapacity: section.TotalCapacity,
        ClassNumber: section.ClassNumber,
        CourseNumber: instruction?.course?.CourseNumber,
        EndTime: event?.EndTime,
        Friday: event?.Friday,
        InstructionMode: section.InstructionMode,
        InstructorFirst: instruction?.professor?.FirstName,
        InstructorLast: instruction?.professor?.LastName?.valueOf(),
        Location: `${event?.location?.Building} ${event?.location?.Room}`,
        Monday: event?.Monday,
        Saturday: event?.Saturday,
        Section: section.SectionNumber,
        StartTime: event?.StartTime,
        Subject: instruction?.course?.subject?.Name,
        Sunday: event?.Sunday,
        Term: term?.TermName,
        Thursday: event?.Thursday,
        Tuesday: event?.Tuesday,
        Units: instruction?.course?.Units?.valueOf(),
        Wednesday: event?.Wednesday,
        TotalEnrollment: section.GradePoints,
        A: gradeData?.A.valueOf(),
        Am: gradeData?.Am.valueOf(),
        Bp: gradeData?.Bp.valueOf(),
        B: gradeData?.B.valueOf(),
        Bm: gradeData?.Bm.valueOf(),
        Cp: gradeData?.Cp.valueOf(),
        C: gradeData?.C.valueOf(),
        Cm: gradeData?.Cm.valueOf(),
        Dp: gradeData?.Dp.valueOf(),
        D: gradeData?.D.valueOf(),
        Dm: gradeData?.Dm.valueOf(),
        F: gradeData?.F.valueOf(),
        AvgGPA: section.AvgGPA,
        instructionId: section.InstructionId.valueOf(),
        Graded: new Boolean(gradeData),
        instructions: {
          id: instruction?.id.valueOf(),
          Subject: instruction?.course?.subject?.Name,
          CourseNumber: instruction?.course?.CourseNumber,
          InstructorFirst: instruction?.professor?.FirstName || 'Error',
          InstructorLast:
            instruction?.professor?.LastName?.valueOf() || 'Error',
          instruction: instruction?.GradePoints,
          AvgGPA: instruction?.AvgGPA,
          TotalEnrollment: instruction?.GradePoints,
          courseId: instruction?.CourseId.valueOf(),
          instructorId: instruction?.ProfessorId.valueOf(),
        },
      };
    });
  }
}
