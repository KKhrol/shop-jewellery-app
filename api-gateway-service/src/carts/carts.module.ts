import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientCartOptions } from 'src/grpc-client-options/grpc-client-cart.options';
import { CartsController } from './carts.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CART_PACKAGE',
        ...grpcClientCartOptions,
      },
    ]),
  ],
  controllers: [CartsController],
})
export class CartsModule {}
