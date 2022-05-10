import { Observable } from 'rxjs';
import { CreateReviewDto } from './create-review.interface';
import { DeleteReviewDto } from './deleted-review-output.interface';
import { ReviewByItemId } from './review-by-item-id.interface';
import { ReviewByUserId } from './review-by-user-id.interface';
import { ReviewInUserRatingList } from './review-in-user-rating-list.interface';
import { Review } from './review.interface';
import { UpdateReviewDto } from './update-review.interface';

export interface IReviewsService {
  findOne(data: ReviewByItemId): Observable<Review>;
  deleteOne(data: ReviewByItemId): Observable<DeleteReviewDto>;
  findMany(data: ReviewByUserId): Observable<ReviewInUserRatingList>;
  deleteMany(data: ReviewByUserId): Observable<DeleteReviewDto>;
  addOne(data: CreateReviewDto): Observable<Review>;
  updateOne(data: UpdateReviewDto): Observable<Review>;
}
