import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 statics 文件夹为静态目录，以达到可直接访问下面文件的目的
  app.use('/static', express.static('statics'));

  app.setGlobalPrefix('api');

  // 开启白名单，自动去除dto中不存在的属性
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('yylww')
    .setDescription('The Admin API description')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  // 允许跨域
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
