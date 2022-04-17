import { Module } from '@nestjs/common';
import { CollectionsModule } from './collections/collections.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { CartsModule } from './carts/carts.module';

@Module({
  imports: [
    CollectionsModule,
    ItemsModule,
    OrdersModule,
    UsersModule,
    CartsModule,
  ],
})
export class AppModule {}
