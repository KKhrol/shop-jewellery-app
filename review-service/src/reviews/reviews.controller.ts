import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDto } from './dto/deleted-review-output.dto';
import { ResponseData } from './dto/response-data.dto';
import { ReviewByItemId } from './dto/review-by-item-id.dto';
import { ReviewByUserId } from './dto/review-by-user-id.dto';
import { ReviewInUserRatingList } from './dto/review-in-user-rating-list.dto';
import { Review } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
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
