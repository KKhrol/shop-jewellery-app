import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ResponseData } from '../common-interfaces/response-data.interface';
import { ResponseError } from '../common-interfaces/response-error.interface';
import { DeleteReviewDto } from './interfaces/deleted-review-output.interface';
import { ReviewByUserId } from './interfaces/review-by-user-id.interface';
import { ReviewInUserRatingList } from './interfaces/review-in-user-rating-list.interface';
import { IReviewsService } from './interfaces/review-service.interface';
import { Review } from './interfaces/review.interface';

@Controller('reviews')
export class ReviewsController implements OnModuleInit {
  constructor(@Inject('REVIEW_PACKAGE') private readonly client: ClientGrpc) {}

  private reviewsService: IReviewsService;
  onModuleInit() {
    this.reviewsService =
      this.client.getService<IReviewsService>('ReviewsController');
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Observable<ResponseData<Review> | ResponseError> {
    return this.reviewsService.findOne({ id });
  }

  @Get()
  findMany(
    @Body() data: ReviewByUserId,
  ): Observable<ResponseData<ReviewInUserRatingList[]> | ResponseError> {
    return this.reviewsService.findMany(data);
  }

  @Delete()
  deleteManyItems(
    @Body() data: ReviewByUserId,
  ): Observable<ResponseData<DeleteReviewDto> | ResponseError> {
    return this.reviewsService.deleteMany(data);
  }
}
