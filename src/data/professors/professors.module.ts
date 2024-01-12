import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';

@Module({
  imports: [],
  controllers: [ProfessorsController],
})
export class ProfessorsModule {}
