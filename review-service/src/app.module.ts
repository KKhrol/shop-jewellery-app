import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews/reviews.controller';

@Module({
  imports: [],
  controllers: [ReviewsController],
})
export class AppModule {}
