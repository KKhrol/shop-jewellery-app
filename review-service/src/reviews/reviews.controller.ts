import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
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
    const rating = await this.reviewsService.getRatingByItemId(data.id);

    if (!rating) {
      throw new RpcException("The rating of the item wasn't found!");
    }

    return {
      status: 'success',
      message: 'Review found.',
      data: rating,
    };
  }

  @GrpcMethod('ReviewsController', 'DeleteOne')
  async deleteOne(
    data: ReviewByItemId,
  ): Promise<ResponseData<DeleteReviewDto>> {
    const deletedItem = await this.reviewsService.deleteRatingByItemId(data.id);
    if (!deletedItem) {
      throw new RpcException("The item wasn't deleted.");
    }
    return {
      status: 'success',
      message: 'Reviews of item deleted.',
      data: deletedItem,
    };
  }

  @GrpcMethod('ReviewsController', 'FindMany')
  async findMany(
    data: ReviewByUserId,
  ): Promise<ResponseData<ReviewInUserRatingList[]>> {
    const ratings = await this.reviewsService.getRatingsByUserId(data.userId);

    if (!ratings) {
      throw new RpcException('No ratings were found!');
    }

    return {
      status: 'success',
      message: 'Reviews found.',
      data: ratings,
    };
  }

  @GrpcMethod('ReviewsController', 'DeleteMany')
  async deleteMany(
    data: ReviewByUserId,
  ): Promise<ResponseData<DeleteReviewDto>> {
    const deletedRating = await this.reviewsService.deleteRatingsByUserId(
      data.userId,
    );

    if (!deletedRating) {
      throw new RpcException("Rating of the item wasn't deleted!");
    }

    return {
      status: 'success',
      message: 'Reviews of user deleted.',
      data: deletedRating,
    };
  }

  @GrpcMethod('ReviewsController', 'AddOne')
  async addOne(
    createReviewDto: CreateReviewDto,
  ): Promise<ResponseData<Review>> {
    if (!createReviewDto.itemId) {
      throw new RpcException('No itemId was provided.');
    }

    const createdRating = await this.reviewsService.createRating(
      createReviewDto,
    );

    if (!createdRating) {
      throw new RpcException("The rating wasn't created.");
    }
    return {
      status: 'success',
      message: 'Review added.',
      data: createdRating,
    };
  }

  @GrpcMethod('ReviewsController', 'UpdateOne')
  async updateOne(
    updateReviewDto: UpdateReviewDto,
  ): Promise<ResponseData<Review>> {
    if (!updateReviewDto.itemId) {
      throw new RpcException('No itemId was provided.');
    }
    const updatedRating = await this.reviewsService.updateRating(
      updateReviewDto,
    );

    if (!updatedRating) {
      throw new RpcException("The rating wasn't updated.");
    }
    return {
      status: 'success',
      message: 'Review updated.',
      data: updatedRating,
    };
  }
}
