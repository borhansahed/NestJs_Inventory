import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CheckUserMiddleware } from './middleware/checkUser.middieware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(CheckUserMiddleware);
  await app.listen(3000);
}
bootstrap();
