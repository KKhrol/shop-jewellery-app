import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ReviewByItemId } from './interfaces/review-by-item-id.interface';
import { Review } from './interfaces/review.interface';

@Controller('reviews')
export class ReviewsController {
  //constructor(private reviewsService: ReviewsService){}
  @GrpcMethod('ReviewsService', 'FindOne')
  findOne(data: ReviewByItemId): Review {
    const reviews = [
      {
        itemId: '1a',
        userId: '1a',
        mark: 3.4,
      },
      {
        itemId: '1a',
        userId: '2b',
        mark: 4.4,
      },
      {
        itemId: '2b',
        userId: '1a',
        mark: 2.8,
      },
      {
        itemId: '2b',
        userId: '2b',
        mark: 5.0,
      },
    ];
    return reviews.find(({ itemId }) => itemId === data.id);
  }
}
