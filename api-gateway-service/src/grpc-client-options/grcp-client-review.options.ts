import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientReviewOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'review',
    protoPath: join(__dirname, '../reviews/review.proto'),
    url: 'localhost:5506',
  },
};
