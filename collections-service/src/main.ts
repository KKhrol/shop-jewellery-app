import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionFilter } from './collections/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5501',
        package: 'collection',
        protoPath: join(__dirname, '../collections/collection.proto'),
      },
    },
  );
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
