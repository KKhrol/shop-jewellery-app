import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './interfaces/create-review.interface';
import { DeleteReviewDto } from './interfaces/deleted-review-output.interface';
import { ReviewInUserRatingList } from './interfaces/review-in-user-rating-list.interface';
import { Review } from './interfaces/review.interface';
import { UpdateReviewDto } from './interfaces/update-review.interface';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getRatingByItemId(itemId: string): Promise<Review | null> {
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

  async deleteRatingByItemId(itemId: string): Promise<DeleteReviewDto> {
    const deletedRating = await this.prisma.review.deleteMany({
      where: {
        itemId,
      },
    });
    const deletedItem = await this.prisma.item.delete({
      where: {
        id: itemId,
      },
    });
    //need to add checking the success of deletion and throwing an error if not deleted
    console.log(deletedItem);
    console.log(deletedRating);
    return { message: 'Rating of the item was deleted!' };
  }

  async deleteRatingsByUserId(userId: string): Promise<DeleteReviewDto> {
    const deletedRating = await this.prisma.review.deleteMany({
      where: {
        userId,
      },
    });
    console.log(deletedRating);
    return { message: 'Ratings of the items were deleted!' };
  }

  async getRatingsByUserId(
    userId: string,
  ): Promise<Observable<ReviewInUserRatingList>> {
    const ratings = await this.prisma.review.findMany({
      where: {
        userId,
      },
      include: {
        item: {
          select: {
            image: true,
            name: true,
            metalImage: true,
          },
        },
      },
    });

    const res = [];

    let i = 0;
    ratings.forEach(function (rating) {
      res[i] = {
        itemId: rating.itemId,
        mark: rating.mark,
        image: rating.item.image,
        name: rating.item.name,
        metalImage: rating.item.metalImage,
      };
      i++;
    });
    const result = from(res);
    return result;
  }

  async createRating(data: CreateReviewDto): Promise<Review | null> {
    if (data.itemId) {
      const createdRating = await this.prisma.review.create({
        data: {
          userId: data.userId,
          mark: data.mark,
          item: {
            connectOrCreate: {
              where: {
                id: data.itemId,
              },
              create: {
                id: data.itemId,
                name: data.name,
                metalImage: data.metalImage,
                image: data.image,
              },
            },
          },
        },
      });
      const rating = await this.prisma.review.aggregate({
        where: {
          itemId: data.itemId,
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
    return null;
  }

  async updateRating(data: UpdateReviewDto): Promise<Review | null> {
    if (data.itemId) {
      const updatedRating = await this.prisma.review.update({
        where: {
          userId_itemId: {
            itemId: data.itemId,
            userId: data.userId,
          },
        },
        data: {
          mark: data.mark,
        },
      });
      const rating = await this.prisma.review.aggregate({
        where: {
          itemId: data.itemId,
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
    return null;
  }
}
