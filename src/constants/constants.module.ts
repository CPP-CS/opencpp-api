import { Module } from '@nestjs/common';
import { ConstantsController } from './constants.controller';

@Module({
  imports: [],
  controllers: [ConstantsController],
  providers: [],
})
export class ConstantsModule {}
