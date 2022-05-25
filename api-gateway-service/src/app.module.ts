import { Module } from '@nestjs/common';
import { CollectionsModule } from './collections/collections.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CollectionsModule,
    ItemsModule,
    OrdersModule,
    UsersModule,
    CartsModule,
    InventoryModule,
    ReviewsModule,
    AuthModule,
  ],
})
export class AppModule {}
