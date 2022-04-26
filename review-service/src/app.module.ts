import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews/reviews.controller';
import { PrismaService } from './prisma/prisma.service';
import { ReviewsService } from './reviews/reviews.service';

@Module({
  imports: [],
  controllers: [ReviewsController],
  providers: [PrismaService, ReviewsService],
})
export class AppModule {}
