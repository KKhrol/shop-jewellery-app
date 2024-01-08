import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { DeleteReviewDto } from './dto/deleted-review-output.dto';
import { ReviewInUserRatingList } from './dto/review-in-user-rating-list.dto';
import { Review } from './dto/review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

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

    if (!rating) {
      return null;
    }

    const res = {
      voters: rating._count.userId,
      mark: rating._avg.mark,
    };
    return res;
  }

  async deleteRatingByItemId(id: string): Promise<DeleteReviewDto | null> {
    const deletedItem = await this.prisma.item.delete({
      where: {
        id,
      },
    });

    if (!deletedItem) {
      return null;
    }
    return { message: 'Rating of the item was deleted!' };
  }

  async deleteRatingsByUserId(userId: string): Promise<DeleteReviewDto | null> {
    const deletedRating = await this.prisma.review.deleteMany({
      where: {
        userId,
      },
    });

    if (!deletedRating) {
      return null;
    }

    return { message: 'Ratings of the items were deleted!' };
  }

  async getRatingsByUserId(
    userId: string,
  ): Promise<ReviewInUserRatingList[] | null> {
    const ratings = await this.prisma.review.findMany({
      where: {
        userId: userId,
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

    if (!ratings) {
      return null;
    }

    const result = [];

    let i = 0;
    ratings.forEach(function (rating) {
      result[i] = {
        itemId: rating.itemId,
        mark: rating.mark,
        image: rating.item.image,
        name: rating.item.name,
        metalImage: rating.item.metalImage,
      };
      i++;
    });
    return result;
  }

  async createRating(data: CreateReviewDto): Promise<Review | null> {
    const createdRating = await this.prisma.review
      .create({
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
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!createdRating) {
      return null;
    }

    return this.getRatingByItemId(data.itemId);
  }

  async updateRating(data: UpdateReviewDto): Promise<Review | null> {
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

    if (!updatedRating) {
      return null;
    }
    return this.getRatingByItemId(data.itemId);
  }
}
