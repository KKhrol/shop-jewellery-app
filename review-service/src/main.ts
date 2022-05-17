import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionFilter } from './reviews/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5506',
        package: 'review',
        protoPath: join(__dirname, '../reviews/review.proto'),
      },
    },
  );
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
