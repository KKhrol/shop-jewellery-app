import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { AddItemInCartDto } from './interfaces/add-item-in-cart.interface';
import { CartByItemId } from './interfaces/cart-by-item-id.interface';
import { CartByUserId } from './interfaces/cart-by-user-id.interface';
import { Cart, ItemInCart } from './interfaces/cart.interface';
import { CreateItemDto } from './interfaces/create-item-in-cart.interface';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { ResponseData } from './interfaces/response-data.interface';
import { UpdateCartDto } from './interfaces/update-cart.interface';
import { UpdateItemDto } from './interfaces/update-item-in-cart.interface';

describe('CartsController', () => {
  let controller: CartsController;
  let service: CartsService;

  const ApiServiceProvider = {
    provide: CartsService,
    useFactory: () => ({
      getCartByUserId: jest.fn((id: string) => {
        if (!id) {
          return null;
        }
        if (id === 'findRejected') {
          throw new RpcException('Error performing getCartByUserId method.');
        }
        return new Cart();
      }),

      addItem: jest.fn((data: AddItemInCartDto) => {
        if (!data.itemId || !data.userId) {
          return null;
        }

        if (
          data.itemId === 'creationRejected' ||
          data.userId === 'creationRejected'
        ) {
          throw new RpcException('Error performing addItem method.');
        }

        return data.userId;
      }),

      createItem: jest.fn((data: CreateItemDto) => {
        if (
          !data.description ||
          !data.image ||
          !data.itemName ||
          !data.metalImage ||
          !data.price
        ) {
          return null;
        }

        if (data.itemName === 'creationRejected') {
          throw new RpcException('Error performing createItem method.');
        }
        return new ItemInCart();
      }),

      updateItem: jest.fn((data: UpdateItemDto) => {
        if (!data.id) {
          return null;
        }

        if (data.id === 'updateRejected') {
          throw new RpcException('Error performing updateItem method.');
        }
        return new ItemInCart();
      }),

      removeItemFromCart: jest.fn((data: CartByItemId) => {
        if (!data.itemId || !data.userId) {
          return null;
        }
        if (
          data.itemId === 'deletionRejected' ||
          data.userId === 'deletionRejected'
        ) {
          throw new RpcException('Error performing removeItemFromCart method.');
        }
        return data.userId;
      }),

      deleteItem: jest.fn((id: string) => {
        if (!id) {
          return null;
        }
        if (id === 'deletionRejected') {
          throw new RpcException('Error performing deleteItem method.');
        }
        return new DeleteItemDto();
      }),

      clearCart: jest.fn((data: CartByUserId) => {
        if (!data.id) {
          return null;
        }
        if (data.id === 'deletionRejected') {
          throw new RpcException('Error performing clearCart method.');
        }
        return new DeleteItemDto();
      }),

      updateCart: jest.fn((data: UpdateCartDto) => {
        if (!data.itemId || !data.userId) {
          return null;
        }
        if (
          data.itemId === 'updateRejected' ||
          data.userId === 'updateRejected'
        ) {
          throw new RpcException('Error performing updateCart method.');
        }

        return data.userId;
      }),
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [CartsService, ApiServiceProvider],
    }).compile();

    controller = module.get<CartsController>(CartsController);
    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Tests for addItem method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new AddItemInCartDto();
      dto.itemId = 'itemId';
      dto.userId = 'userId';

      expect(controller.addItem(dto)).not.toEqual(null);
      expect(controller.addItem(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.addItem(dto)).resolves.toMatchObject(
        new ResponseData<Cart>(),
      );
    });
    it('should throw RpcException when no carts found', async () => {
      const dto = new CartByUserId();

      await expect(controller.findCart(dto)).rejects.toThrow(RpcException);
      await expect(controller.findCart(dto)).rejects.toThrow(
        'No carts were found!',
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new CartByUserId();
      dto.id = 'findRejected';
      await expect(controller.findCart(dto)).rejects.toThrow(RpcException);
      await expect(controller.findCart(dto)).rejects.toThrow(
        'Error performing getCartByUserId method.',
      );
    });

    it('should call getCollection method of the service.', async () => {
      const dto = new CartByUserId();
      dto.id = 'id';

      await controller.findCart(dto);
      expect(service.getCartByUserId).toHaveBeenCalled();
      expect(service.getCartByUserId).toHaveBeenCalledWith(dto.id);
    });
  });
});
