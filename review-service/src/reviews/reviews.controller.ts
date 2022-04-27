import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { DeleteReviewDto } from './interfaces/deleted-review-output.interface';
import { ReviewByItemId } from './interfaces/review-by-item-id.interface';
import { Review } from './interfaces/review.interface';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @GrpcMethod('ReviewsController', 'FindOne')
  async findOne(data: ReviewByItemId): Promise<Review> {
    return this.reviewsService.getRating(data.id);
  }

  @GrpcMethod('ReviewsController', 'DeleteOne')
  async deleteOne(data: ReviewByItemId): Promise<DeleteReviewDto> {
    return this.reviewsService.deleteRating(data.id);
  }
}
