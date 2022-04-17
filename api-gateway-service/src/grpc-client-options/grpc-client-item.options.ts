import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientItemOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'item',
    protoPath: join(__dirname, '../items/item.proto'),
    url: 'localhost:5502',
  },
};
