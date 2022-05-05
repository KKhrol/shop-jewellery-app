import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientReviewOptions } from '../grpc-client-options/grcp-client-review.options';
import { grpcClientInventoryOptions } from '../grpc-client-options/grcp-client-inventory.options';
import { grpcClientItemOptions } from '../grpc-client-options/grpc-client-item.options';
import { ItemsController } from './items.controller';
import { MetalsController } from './metals/metals.controller';
import { grpcClientCartOptions } from '../grpc-client-options/grpc-client-cart.options';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ITEM_PACKAGE',
        ...grpcClientItemOptions,
      },
      {
        name: 'INVENTORY_PACKAGE',
        ...grpcClientInventoryOptions,
      },
      {
        name: 'REVIEW_PACKAGE',
        ...grpcClientReviewOptions,
      },
      {
        name: 'CART_PACKAGE',
        ...grpcClientCartOptions,
      },
    ]),
  ],
  controllers: [ItemsController, MetalsController],
})
export class ItemsModule {}
