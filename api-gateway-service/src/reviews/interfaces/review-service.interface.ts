import { Observable } from 'rxjs';
import { ReviewByItemId } from './review-by-item-id.interface';
import { Review } from './review.interface';

export interface IReviewsService {
  findOne(data: ReviewByItemId): Observable<Review>;
}
