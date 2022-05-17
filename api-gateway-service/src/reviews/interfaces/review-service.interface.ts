import { Observable } from 'rxjs';
import { ResponseData } from '../../common-interfaces/response-data.interface';
import { ResponseError } from '../../common-interfaces/response-error.interface';
import { CreateReviewDto } from './create-review.interface';
import { DeleteReviewDto } from './deleted-review-output.interface';
import { ReviewByItemId } from './review-by-item-id.interface';
import { ReviewByUserId } from './review-by-user-id.interface';
import { ReviewInUserRatingList } from './review-in-user-rating-list.interface';
import { Review } from './review.interface';
import { UpdateReviewDto } from './update-review.interface';

export interface IReviewsService {
  findOne(
    data: ReviewByItemId,
  ): Observable<ResponseData<Review> | ResponseError>;
  deleteOne(
    data: ReviewByItemId,
  ): Observable<ResponseData<DeleteReviewDto> | ResponseError>;
  findMany(
    data: ReviewByUserId,
  ): Observable<ResponseData<ReviewInUserRatingList[]> | ResponseError>;
  deleteMany(
    data: ReviewByUserId,
  ): Observable<ResponseData<DeleteReviewDto> | ResponseError>;
  addOne(
    data: CreateReviewDto,
  ): Observable<ResponseData<Review> | ResponseError>;
  updateOne(
    data: UpdateReviewDto,
  ): Observable<ResponseData<Review> | ResponseError>;
}
