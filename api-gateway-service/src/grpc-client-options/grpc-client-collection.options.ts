import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientCollectionOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'collection',
    protoPath: join(__dirname, '../collections/collection.proto'),
    url: 'localhost:5501',
  },
};
