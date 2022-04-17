import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientCartOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'cart',
    protoPath: join(__dirname, '../carts/cart.proto'),
    url: 'localhost:5503',
  },
};
