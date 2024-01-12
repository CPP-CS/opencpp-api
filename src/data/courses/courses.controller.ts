import { Controller, Post } from '@nestjs/common';
import { Course, Subject } from 'src/db/db';

@Controller()
export class CoursesController {
  constructor() {}

  @Post('findAll')
  async findAll() {
    const courses = await Course.findAll({
      include: {
        model: Subject,
        as: 'subject',
      },
    });
    return courses.map((course) => {
      const Subject = course.subject?.Name || 'ERR';
      const Label = Subject + ' ' + course.CourseNumber;

      return {
        id: course.id.valueOf(),
        Subject,
        CourseNumber: course.CourseNumber,
        TotalEnrollment: course.GradePoints,
        AvgGPA: course.AvgGPA,
        Label,
        CourseTitle: course.CourseTitle?.valueOf(),
      };
    });
  }
}
