import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOrderOptions } from '../grpc-client-options/grpc-client-order.options';
import { grpcClientCartOptions } from '../grpc-client-options/grpc-client-cart.options';
import { CartsController } from './carts.controller';
//import { RequestContextProvider } from '../auth/jwt.strategy';

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
  //providers: [RequestContextProvider],
})
export class CartsModule {}
