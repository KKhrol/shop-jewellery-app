import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientCollectionOptions } from 'src/grpc-client-options/grpc-client-collection.options';
import { CollectionsController } from './collections.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COLLECTION_PACKAGE',
        ...grpcClientCollectionOptions,
      },
    ]),
  ],
  controllers: [CollectionsController],
})
export class CollectionsModule {}
