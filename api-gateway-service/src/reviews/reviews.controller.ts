import { Controller, Get, Inject, OnModuleInit, Param } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IReviewsService } from './interfaces/review-service.interface';
import { Review } from './interfaces/review.interface';

@Controller('reviews')
export class ReviewsController implements OnModuleInit {
  constructor(@Inject('REVIEW_PACKAGE') private readonly client: ClientGrpc) {}

  private reviewsService: IReviewsService;
  onModuleInit() {
    this.reviewsService =
      this.client.getService<IReviewsService>('ReviewsService');
  }

  @Get(':id')
  findOne(@Param('id') id: string): Observable<Review> {
    return this.reviewsService.findOne({ id });
  }
}
