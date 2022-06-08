import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { grpcClientReviewOptions } from '../grpc-client-options/grcp-client-review.options';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REVIEW_PACKAGE',
        ...grpcClientReviewOptions,
      },
    ]),
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
