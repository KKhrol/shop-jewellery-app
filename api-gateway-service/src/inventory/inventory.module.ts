import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientInventoryOptions } from '../grpc-client-options/grcp-client-inventory.options';
import { InventoryController } from './inventory.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INVENTORY_PACKAGE',
        ...grpcClientInventoryOptions,
      },
    ]),
  ],
  controllers: [InventoryController],
})
export class InventoryModule {}
