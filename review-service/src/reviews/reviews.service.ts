import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from './interfaces/review.interface';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getRating(itemId: string): Promise<Review | null> {
    const rating = await this.prisma.review.aggregate({
      where: {
        itemId,
      },
      _count: {
        userId: true,
      },
      _avg: {
        mark: true,
      },
    });
    const res = {
      voters: rating._count.userId,
      mark: rating._avg.mark,
    };
    return res;
  }
}
