import { Module } from '@nestjs/common';
import { InstructionsController } from './instructions.controller';

@Module({
  imports: [],
  controllers: [InstructionsController],
})
export class InstructionsModule {}
