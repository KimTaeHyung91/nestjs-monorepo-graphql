import { NestFactory } from '@nestjs/core';
import { GraphqlApiModule } from './graphql-api.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GraphqlApiModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3003);
}

bootstrap();