import { Observable } from 'rxjs';
import { DeleteReviewDto } from './deleted-review-output.interface';
import { ReviewByItemId } from './review-by-item-id.interface';
import { Review } from './review.interface';

export interface IReviewsService {
  findOne(data: ReviewByItemId): Observable<Review>;
  deleteOne(data: ReviewByItemId): Observable<DeleteReviewDto>;
}
