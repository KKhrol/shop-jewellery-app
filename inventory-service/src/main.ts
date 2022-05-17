import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionFilter } from './filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5505',
        package: 'inventory',
        protoPath: join(__dirname, '../inventory/inventory.proto'),
      },
    },
  );
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
