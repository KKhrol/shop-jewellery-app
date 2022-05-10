import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientOrderOptions } from '../grpc-client-options/grpc-client-order.options';
import { OrdersController } from './orders.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_PACKAGE',
        ...grpcClientOrderOptions,
      },
    ]),
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
