import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateReviewDto } from './interfaces/create-review.interface';
import { DeleteReviewDto } from './interfaces/deleted-review-output.interface';
import { ReviewByItemId } from './interfaces/review-by-item-id.interface';
import { ReviewByUserId } from './interfaces/review-by-user-id.interface';
import { ReviewInUserRatingList } from './interfaces/review-in-user-rating-list.interface';
import { Review } from './interfaces/review.interface';
import { UpdateReviewDto } from './interfaces/update-review.interface';
import { ReviewsService } from './reviews.service';

@Controller()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}
  @GrpcMethod('ReviewsController', 'FindOne')
  async findOne(data: ReviewByItemId): Promise<Review> {
    return this.reviewsService.getRatingByItemId(data.id);
  }

  @GrpcMethod('ReviewsController', 'DeleteOne')
  async deleteOne(data: ReviewByItemId): Promise<DeleteReviewDto> {
    return this.reviewsService.deleteRatingByItemId(data.id);
  }

  @GrpcMethod('ReviewsController', 'FindMany')
  async findMany(
    data: ReviewByUserId,
  ): Promise<Observable<ReviewInUserRatingList>> {
    return this.reviewsService.getRatingsByUserId(data.userId);
  }

  @GrpcMethod('ReviewsController', 'DeleteManyItems')
  async deleteManyItems(data: ReviewByUserId): Promise<DeleteReviewDto> {
    return this.reviewsService.deleteRatingsByUserId(data.userId);
  }

  @GrpcMethod('ReviewsController', 'AddOne')
  async addOne(createReviewDto: CreateReviewDto): Promise<Review> {
    return this.reviewsService.createRating(createReviewDto);
  }

  @GrpcMethod('ReviewsController', 'UpdateOne')
  async updateOne(updateReviewDto: UpdateReviewDto): Promise<Review> {
    return this.reviewsService.updateRating(updateReviewDto);
  }
}
