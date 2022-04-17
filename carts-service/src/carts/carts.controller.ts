import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CartByUserId } from './interfaces/cart-by-id.interface';
import { Cart } from './interfaces/cart.interface';

@Controller('carts')
export class CartsController {
  //constructor(private cartsService: CartsService){}
  @GrpcMethod('CartsService', 'FindOne')
  findOne(data: CartByUserId): Cart {
    console.log('Here');
    const carts = [
      {
        userId: '1a',
        itemInCart: [
          {
            itemId: '1a',
            quantity: 2,
          },
        ],
      },
      {
        userId: '1a',
        itemInCart: [
          {
            itemId: '1a',
            quantity: 2,
          },
          {
            itemId: '2b',
            quantity: 1,
          },
          {
            itemId: '3c',
            quantity: 1,
          },
        ],
      },
    ];
    return carts.find(({ userId }) => userId === data.id);
  }
}
