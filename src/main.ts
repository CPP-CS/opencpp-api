import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as sourceMapSupport from 'source-map-support';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.enableCors();
  await app.listen(3000);
}
sourceMapSupport.install();
bootstrap();
