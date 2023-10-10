import { Module } from '@nestjs/common';
import { DBService } from './db.service';

@Module({
  imports: [],
  providers: [DBService],
})
export class DBModule {}
