import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientInventoryOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'inventory',
    protoPath: join(__dirname, '../inventory/inventory.proto'),
    url: 'localhost:5505',
  },
};
