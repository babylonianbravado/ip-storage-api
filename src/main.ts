import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { HTTP_PORT } from 'utils/constants';

import { ApiModule } from './api.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);

  const configService = app.get(ConfigService);
  const port = configService.get(HTTP_PORT);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

bootstrap();
