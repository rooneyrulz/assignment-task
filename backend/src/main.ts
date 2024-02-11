import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './config/all-exceptions.filter';
import corsOptions from './config/cors-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe());

  app.use(helmet());

  app.enableCors(corsOptions);

  app.setGlobalPrefix('api/v1');

  await app.listen(5000);
}

bootstrap();
