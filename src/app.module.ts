import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConstantsModule } from './constants/constants.module';
import { DataModule } from './data/data.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { DBModule } from './db/db.module';

@Module({
  imports: [
    ConstantsModule,
    // This is not the appropriate way to load a database in NestJS.
    // Future efforts must be made for proper integration.
    DBModule,
    DataModule,
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
