/*import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewsService } from './reviews.service';

class PrismaServiceMock {
  public async getRatingByItemId(itemId: string) {
    return {
      voters: 234,
      mark: 3.45,
    };
  }
  public async deleteRatingByItemId(itemId: string) {
    return { message: 'Rating of the item was deleted!' };
  }
  public async deleteRatingsByUserId(userId: string) {
    return { message: 'Ratings of the items were deleted!' };
  }
  public async getRatingsByUserId(userId: string) {}
  public async createRating(data: CreateReviewDto) {}
  public async updateRating(data: UpdateReviewDto) {}
}
describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    const PrismaServiceProvider = {
      provide: PrismaService,
      useClass: PrismaServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService, PrismaServiceProvider],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
*/
