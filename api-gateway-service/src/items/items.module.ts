import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientItemOptions } from 'src/grpc-client-options/grpc-client-item.options';
import { ItemsController } from './items.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ITEM_PACKAGE',
        ...grpcClientItemOptions,
      },
    ]),
  ],
  controllers: [ItemsController],
})
export class ItemsModule {}
