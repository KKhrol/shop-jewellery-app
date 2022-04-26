import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientReviewOptions } from '../grpc-client-options/grcp-client-review.options';
import { grpcClientInventoryOptions } from '../grpc-client-options/grcp-client-inventory.options';
import { grpcClientItemOptions } from '../grpc-client-options/grpc-client-item.options';
import { ItemsController } from './items.controller';

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
    ]),
  ],
  controllers: [ItemsController],
})
export class ItemsModule {}
