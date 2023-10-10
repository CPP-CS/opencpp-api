import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';

@Module({
  imports: [],
  controllers: [SectionsController],
})
export class SectionsModule {}
