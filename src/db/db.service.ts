import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as db from './db';

@Injectable()
export class DBService {
  constructor(configService: ConfigService) {
    db.init(
      false,
      configService.getOrThrow('DB_DB_NAME'),
      configService.getOrThrow('DB_TEST_DB_NAME'),
      configService.getOrThrow('DB_USERNAME'),
      configService.getOrThrow('DB_PASSWORD'),
      configService.getOrThrow('DB_HOST'),
    );
  }
}
