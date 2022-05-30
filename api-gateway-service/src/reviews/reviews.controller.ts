import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HttpExceptionFilter } from '../filters/exception.filter';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResponseData } from '../common-interfaces/response-data.interface';
import { ResponseError } from '../common-interfaces/response-error.interface';
import { DeleteReviewDto } from './interfaces/deleted-review-output.interface';
import { ReviewByUserId } from './interfaces/review-by-user-id.interface';
import { ReviewInUserRatingList } from './interfaces/review-in-user-rating-list.interface';
import { IReviewsService } from './interfaces/review-service.interface';
import { Review } from './interfaces/review.interface';
import { User } from 'src/decorators/user.decorator';

@UseFilters(new HttpExceptionFilter())
@UseGuards(JwtAuthGuard)
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
    @User('userId') userId: string,
  ): Observable<ResponseData<ReviewInUserRatingList[]> | ResponseError> {
    return this.reviewsService.findMany({ userId });
  }

  @Delete()
  deleteManyItems(
    @User('userId') userId: string,
  ): Observable<ResponseData<DeleteReviewDto> | ResponseError> {
    return this.reviewsService.deleteMany({ userId });
  }
}
