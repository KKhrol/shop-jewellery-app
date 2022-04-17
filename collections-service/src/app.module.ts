import { Module } from '@nestjs/common';
import { CollectionsController } from './collections/collections.controller';

@Module({
  imports: [],
  controllers: [CollectionsController],
})
export class AppModule {}
