import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { ExceptionFilter } from './carts/filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: 'localhost:5503',
        package: 'cart',
        protoPath: join(__dirname, '../carts/cart.proto'),
      },
    },
  );
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
