import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable, toArray } from 'rxjs';
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
  findOne(@Param('id') id: string): Observable<Review> {
    return this.reviewsService.findOne({ id });
  }

  @Get()
  findMany(@Body() data: ReviewByUserId): Observable<ReviewInUserRatingList[]> {
    const stream = this.reviewsService.findMany(data);
    return stream.pipe(toArray());
  }

  @Delete()
  deleteManyItems(@Body() data: ReviewByUserId): Observable<DeleteReviewDto> {
    return this.reviewsService.deleteMany(data);
  }
}
