import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { CoursesModule } from './courses/courses.module';
import { InstructionsModule } from './instructions/instructions.module';
import { ProfessorsModule } from './professors/professors.module';
import { SectionsModule } from './sections/sections.module';

@Module({
  imports: [
    CoursesModule,
    InstructionsModule,
    ProfessorsModule,
    SectionsModule,
    RouterModule.register([
      {
        path: 'data',
        children: [
          {
            path: 'courses',
            module: CoursesModule,
          },
          {
            path: 'instructions',
            module: InstructionsModule,
          },
          {
            path: 'professors',
            module: ProfessorsModule,
          },
          {
            path: 'sections',
            module: SectionsModule,
          },
        ],
      },
    ]),
  ],
  providers: [],
})
export class DataModule {}
