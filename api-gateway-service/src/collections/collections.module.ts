import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientItemOptions } from '../grpc-client-options/grpc-client-item.options';
import { grpcClientCollectionOptions } from '../grpc-client-options/grpc-client-collection.options';
import { CollectionsController } from './collections.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COLLECTION_PACKAGE',
        ...grpcClientCollectionOptions,
      },
      {
        name: 'ITEM_PACKAGE',
        ...grpcClientItemOptions,
      },
    ]),
  ],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
