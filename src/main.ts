import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
console.log('DB_HOST:', process.env.DB_HOST); // Para verificar se está carregado corretamente

bootstrap();
