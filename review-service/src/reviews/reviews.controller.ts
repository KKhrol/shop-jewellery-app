import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateReviewDto } from './interfaces/create-review.interface';
import { DeleteReviewDto } from './interfaces/deleted-review-output.interface';
import { ResponseData } from './interfaces/response-data.interface';
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
  async findOne(data: ReviewByItemId): Promise<ResponseData<Review>> {
    return {
      status: 'success',
      message: 'Review found.',
      data: await this.reviewsService.getRatingByItemId(data.id),
    };
  }

  @GrpcMethod('ReviewsController', 'DeleteOne')
  async deleteOne(
    data: ReviewByItemId,
  ): Promise<ResponseData<DeleteReviewDto>> {
    return {
      status: 'success',
      message: 'Reviews of item deleted.',
      data: await this.reviewsService.deleteRatingByItemId(data.id),
    };
  }

  @GrpcMethod('ReviewsController', 'FindMany')
  async findMany(
    data: ReviewByUserId,
  ): Promise<ResponseData<ReviewInUserRatingList[]>> {
    return {
      status: 'success',
      message: 'Reviews found.',
      data: await this.reviewsService.getRatingsByUserId(data.userId),
    };
  }

  @GrpcMethod('ReviewsController', 'DeleteMany')
  async deleteMany(
    data: ReviewByUserId,
  ): Promise<ResponseData<DeleteReviewDto>> {
    return {
      status: 'success',
      message: 'Reviews of user deleted.',
      data: await this.reviewsService.deleteRatingsByUserId(data.userId),
    };
  }

  @GrpcMethod('ReviewsController', 'AddOne')
  async addOne(
    createReviewDto: CreateReviewDto,
  ): Promise<ResponseData<Review>> {
    return {
      status: 'success',
      message: 'Review added.',
      data: await this.reviewsService.createRating(createReviewDto),
    };
  }

  @GrpcMethod('ReviewsController', 'UpdateOne')
  async updateOne(
    updateReviewDto: UpdateReviewDto,
  ): Promise<ResponseData<Review>> {
    return {
      status: 'success',
      message: 'Review updated.',
      data: await this.reviewsService.updateRating(updateReviewDto),
    };
  }
}
