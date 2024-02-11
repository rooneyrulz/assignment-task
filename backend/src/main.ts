import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './config/all-exceptions.filter';
import corsOptions from './config/cors-options';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./src/cert/key.pem'),
    cert: fs.readFileSync('./src/cert/cert.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  app.enableCors(corsOptions);

  app.setGlobalPrefix('api/v1');

  await app.listen(5000);
}

bootstrap();
