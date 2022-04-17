import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOrderOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'order',
    protoPath: join(__dirname, '../orders/order.proto'),
    url: 'localhost:5504',
  },
};
