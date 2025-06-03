import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('/api');

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const port = process.env.PORT || 3000;

  await app.listen(port);

  Logger.log(`Running on port: ${port}`);
}

bootstrap();
