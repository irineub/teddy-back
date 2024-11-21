import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Documentação Backend do Teste Tecnico Teddy Open Finance')
    .setDescription('Desenvolvido por Irineu Brito')
    .setVersion('1.0')
    .setContact(
      'Irineu Brito',
      'https://www.linkedin.com/in/irineu-brito/',
      'irineugmestre@gmail.com'
    )
    .addTag('Teddy Open Finance API')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
