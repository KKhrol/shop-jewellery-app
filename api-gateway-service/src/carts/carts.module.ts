import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOrderOptions } from '../grpc-client-options/grpc-client-order.options';
import { grpcClientCartOptions } from '../grpc-client-options/grpc-client-cart.options';
import { CartsController } from './carts.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CART_PACKAGE',
        ...grpcClientCartOptions,
      },
      {
        name: 'ORDER_PACKAGE',
        ...grpcClientOrderOptions,
      },
    ]),
  ],
  controllers: [CartsController],
})
export class CartsModule {}
