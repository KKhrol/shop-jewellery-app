import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ReviewByItemId } from './interfaces/review-by-item-id.interface';
import { Review } from './interfaces/review.interface';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @GrpcMethod('ReviewsController', 'FindOne')
  findOne(data: ReviewByItemId): Promise<Review> {
    return this.reviewsService.getRating(data.id);
  }
}
