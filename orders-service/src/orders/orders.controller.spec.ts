import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderDto, ItemInOrder } from './dto/create-order.dto';
import { DeleteItemInOrderDto } from './dto/delete-item-in-order.dto';
import { DeleteOrderDto } from './dto/delete-order.dto';
import { DeleteItemDto } from './interfaces/deleted-item-output.interface';
import { DeletedOrderOutputDto } from './dto/deleted-order-output.dto';
import { GetOrderByIdDto } from './dto/get-order-by-id.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderInList } from './dto/order-in-list.dto';
import { Order } from './dto/order.dto';
import { ResponseData } from './dto/response-data.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdatedOrderOuput } from './dto/updated-order-output.dto';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController Unit Tests', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: OrdersService,
      useFactory: () => ({
        getOrderById: jest.fn((id: string) => {
          if (id === 'rejected') {
            throw new RpcException('error');
          }
          return id === 'id' ? new Order() : null;
        }),

        getOrderTotalPrice: jest.fn((orderId: string) => {
          if (orderId === 'rejectedOrderTotalPrice') {
            throw new RpcException('error');
          }
          return orderId === 'notFoundPrice' ? null : new Number();
        }),

        createOrder: jest.fn((data: CreateOrderDto) => {
          if (!data.totalPrice || !data.itemInOrder || !data.userId) {
            throw new RpcException('error');
          }
          return data.userId === 'userId' ? new Order() : null;
        }),

        getOrders: jest.fn((data: GetOrdersDto) => {
          if (data.userId === 'rejected') {
            throw new RpcException('error');
          }
          return data.userId ? [new OrderInList()] : null;
        }),

        deleteItem: jest.fn((data: DeleteItemInOrderDto) => {
          if (data.itemId === 'rejected' || data.orderId === 'rejected') {
            throw new RpcException('error');
          }
          return data.itemId === 'notItemId' || data.orderId === 'notOrderId'
            ? null
            : new DeleteOrderDto();
        }),

        deleteOrder: jest.fn((id: string) => {
          if (id === 'deletionRejected') {
            throw new RpcException('error');
          }
          return id !== 'notOrderDeleted' ? new DeletedOrderOutputDto() : null;
        }),

        updateOrder: jest.fn((data: UpdateOrderDto) => {
          if (data.orderId === 'updateRejected') {
            throw new RpcException('error');
          }
          const orderUpdated = new UpdatedOrderOuput();
          if (data.orderId === 'rejected') {
            orderUpdated.id = 'rejected';
          } else if (data.orderId === 'notFound') {
            orderUpdated.id = 'notFound';
          } else {
            orderUpdated.id = 'id';
          }

          return data.orderId === 'notValid' ? null : orderUpdated;
        }),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService, ApiServiceProvider],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Tests for findOrder method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new GetOrderByIdDto();
      dto.id = 'id';

      expect(controller.findOrder(dto)).not.toEqual(null);
      expect(controller.findOrder(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.findOrder(dto)).resolves.toMatchObject(
        new ResponseData<Order>(),
      );
    });
    it('should throw RpcException when orderId is not provided.', async () => {
      const dto = new GetOrderByIdDto();
      dto.id = '';
      await expect(controller.findOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.findOrder(dto)).rejects.toThrow(
        "The order wasn't found",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new GetOrderByIdDto();
      dto.id = 'rejected';
      await expect(controller.findOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.findOrder(dto)).rejects.toThrow('error');
    });

    it('should call getOrderById method of the service.', async () => {
      const dto = new GetOrderByIdDto();
      dto.id = 'id';
      await controller.findOrder(dto);
      expect(service.getOrderById).toHaveBeenCalled();
      expect(service.getOrderById).toHaveBeenCalledWith(dto.id);
    });
  });

  describe('Tests for createOrder method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new CreateOrderDto();
      dto.itemInOrder = [new ItemInOrder()];
      dto.totalPrice = 111;
      dto.userId = 'userId';

      expect(controller.createOrder(dto)).not.toEqual(null);
      expect(controller.createOrder(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.createOrder(dto)).resolves.toMatchObject(
        new ResponseData<Order>(),
      );
    });

    it('should throw RpcException when userId is not provided, when the query could not be performed.', async () => {
      const dto = new CreateOrderDto();
      dto.itemInOrder = [new ItemInOrder()];
      dto.totalPrice = 111;

      await expect(controller.createOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.createOrder(dto)).rejects.toThrow('error');
    });

    it('should throw RpcException when itemInOrder is not provided, when the query could not be performed.', async () => {
      const dto = new CreateOrderDto();
      dto.totalPrice = 111;
      dto.userId = 'userId';

      await expect(controller.createOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.createOrder(dto)).rejects.toThrow('error');
    });

    it('should throw RpcException when totalPrice is not provided, when the query could not be performed.', async () => {
      const dto = new CreateOrderDto();
      dto.itemInOrder = [new ItemInOrder()];
      dto.userId = 'userId';

      await expect(controller.createOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.createOrder(dto)).rejects.toThrow('error');
    });

    it('should throw RpcException when the service could not create an order.', async () => {
      const dto = new CreateOrderDto();
      dto.itemInOrder = [new ItemInOrder()];
      dto.totalPrice = 111;
      dto.userId = 'rejected';
      await expect(controller.createOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.createOrder(dto)).rejects.toThrow(
        "The order wasn't created",
      );
    });

    it('should call createOrder method of the service.', async () => {
      const dto = new CreateOrderDto();
      dto.itemInOrder = [new ItemInOrder()];
      dto.totalPrice = 111;
      dto.userId = 'userId';
      await controller.createOrder(dto);

      expect(service.createOrder).toHaveBeenCalled();
      expect(service.createOrder).toHaveBeenCalledWith(dto);
    });

    describe('Tests for findOrders method.', () => {
      it('checks that returning value is correct.', async () => {
        const dto = new GetOrdersDto();
        dto.userId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';

        expect(controller.findOrders(dto)).not.toEqual(null);
        expect(controller.findOrders(dto)).resolves.toBeInstanceOf(Object);
        expect(controller.findOrders(dto)).resolves.toMatchObject(
          new ResponseData<OrderInList[]>(),
        );
      });
      it('should throw RpcException when userId is not provided.', async () => {
        const dto = new GetOrdersDto();
        dto.userId = '';

        await expect(controller.findOrders(dto)).rejects.toThrow(RpcException);
        await expect(controller.findOrders(dto)).rejects.toThrow(
          'No orders were found.',
        );
      });

      it('should throw RpcException when the service encounters the error while querying the database.', async () => {
        const dto = new GetOrdersDto();
        dto.userId = 'rejected';
        await expect(controller.findOrders(dto)).rejects.toThrow(RpcException);
        await expect(controller.findOrders(dto)).rejects.toThrow('error');
      });

      it('should call getOrders method of the service.', async () => {
        const dto = new GetOrdersDto();
        dto.userId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
        await controller.findOrders(dto);
        expect(service.getOrders).toHaveBeenCalled();
        expect(service.getOrders).toHaveBeenCalledWith(dto);
      });
    });
  });

  describe('Tests for updateOrder method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = 'orderId';
      dto.discount = 50;
      dto.oldTotalPrice = 111;

      expect(controller.updateOrder(dto)).not.toEqual(null);
      expect(controller.updateOrder(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.updateOrder(dto)).resolves.toMatchObject(
        new ResponseData<OrderInList[]>(),
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database for update.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = 'updateRejected';
      dto.discount = 50;
      dto.oldTotalPrice = 111;

      await expect(controller.updateOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOrder(dto)).rejects.toThrow('error');
    });

    it('should throw RpcException when the service encounters the error while querying the database to get the order info.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = 'rejected';
      dto.discount = 50;
      dto.oldTotalPrice = 111;

      await expect(controller.updateOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOrder(dto)).rejects.toThrow('error');
    });

    it('should throw RpcException when the service could not find the order info after update.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = 'notFound';
      dto.discount = 50;
      dto.oldTotalPrice = 111;

      await expect(controller.updateOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOrder(dto)).rejects.toThrow(
        "The order wasn't found",
      );
    });

    it('should throw RpcException when the service could not update the order.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = 'notValid';
      dto.discount = 50;
      dto.oldTotalPrice = 111;

      await expect(controller.updateOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOrder(dto)).rejects.toThrow(
        "The order wasn't updated.",
      );
    });

    it('should throw RpcException when the orderId is not provided.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = '';
      dto.discount = 50;
      dto.oldTotalPrice = 111;

      await expect(controller.updateOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOrder(dto)).rejects.toThrow(
        "The orderId wasn't provided",
      );
    });

    it('should throw RpcException when the discount value is above the acceptable value.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = 'orderId';
      dto.discount = 101;
      dto.oldTotalPrice = 111;

      await expect(controller.updateOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOrder(dto)).rejects.toThrow(
        'Invalid value of discount.',
      );
    });

    it('should throw RpcException when the discount value is below the acceptable value.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = 'orderId';
      dto.discount = -1;
      dto.oldTotalPrice = 111;

      await expect(controller.updateOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOrder(dto)).rejects.toThrow(
        'Invalid value of discount.',
      );
    });

    it('should call updateOrder and getOrderById methods of the service.', async () => {
      const dto = new UpdateOrderDto();
      dto.orderId = 'orderId';
      dto.discount = 50;
      dto.oldTotalPrice = 111;

      await controller.updateOrder(dto);
      expect(service.updateOrder).toHaveBeenCalled();
      expect(service.updateOrder).toHaveBeenCalledWith(dto);
      expect(service.getOrderById).toHaveBeenCalled();
    });
  });

  describe('Tests for deleteItem method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new DeleteItemInOrderDto();
      dto.orderId = 'orderId';
      dto.itemId = 'itemId';

      expect(controller.deleteItem(dto)).not.toEqual(null);
      expect(controller.deleteItem(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.deleteItem(dto)).resolves.toMatchObject(
        new ResponseData<DeleteItemDto>(),
      );
    });
    it('should throw RpcException when the service encounters the error while querying the database for delete.', async () => {
      const dto = new DeleteItemInOrderDto();
      dto.orderId = 'rejected';
      dto.itemId = 'itemId';

      await expect(controller.deleteItem(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteItem(dto)).rejects.toThrow('error');
    });

    it('should throw RpcException when the service could not delete the item.', async () => {
      const dto = new DeleteItemInOrderDto();
      dto.orderId = 'orderId';
      dto.itemId = 'notItemId';

      await expect(controller.deleteItem(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteItem(dto)).rejects.toThrow(
        "The item in order wasn't deleted.",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database for totalPrice.', async () => {
      const dto = new DeleteItemInOrderDto();
      dto.orderId = 'rejectedOrderTotalPrice';
      dto.itemId = 'itemId';

      await expect(controller.deleteItem(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteItem(dto)).rejects.toThrow('error');
    });

    it('should call deleteItem, getOrderTotalPrice and deleteOrder methods of the service.', async () => {
      const dto = new DeleteItemInOrderDto();
      dto.orderId = 'notFoundPrice';
      dto.itemId = 'itemId';

      await controller.deleteItem(dto);
      expect(service.deleteItem).toHaveBeenCalled();
      expect(service.deleteItem).toHaveBeenCalledWith(dto);
      expect(service.getOrderTotalPrice).toHaveBeenCalled();
      expect(service.getOrderTotalPrice).toHaveBeenCalledWith(dto.orderId);
      expect(service.deleteOrder).toHaveBeenCalled();
      expect(service.deleteOrder).toHaveBeenCalledWith(dto.orderId);
    });

    it('should call deleteItem, getOrderTotalPrice and updateOrder methods of the service.', async () => {
      const dto = new DeleteItemInOrderDto();
      dto.orderId = 'orderId';
      dto.itemId = 'itemId';

      await controller.deleteItem(dto);
      expect(service.deleteItem).toHaveBeenCalled();
      expect(service.deleteItem).toHaveBeenCalledWith(dto);
      expect(service.getOrderTotalPrice).toHaveBeenCalled();
      expect(service.getOrderTotalPrice).toHaveBeenCalledWith(dto.orderId);
      expect(service.updateOrder).toHaveBeenCalled();
    });

    it('should throw RpcException when the service encounters the error while querying the database for update.', async () => {
      const dto = new DeleteItemInOrderDto();
      dto.orderId = 'updateRejected';
      dto.itemId = 'itemId';

      await expect(controller.deleteItem(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteItem(dto)).rejects.toThrow('error');
    });

    it('should throw RpcException when the service could not update the totalProce of the order.', async () => {
      const dto = new DeleteItemInOrderDto();
      dto.orderId = 'notValid';
      dto.itemId = 'itemId';

      await expect(controller.deleteItem(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteItem(dto)).rejects.toThrow(
        "The total price in order wasn't updated.",
      );
    });
  });

  describe('Tests for deleteOrder method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new DeleteOrderDto();
      dto.id = 'id';

      expect(controller.deleteOrder(dto)).not.toEqual(null);
      expect(controller.deleteOrder(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.deleteOrder(dto)).resolves.toMatchObject(
        new ResponseData<DeletedOrderOutputDto>(),
      );
    });
    it('should throw RpcException when the service encounters the error while querying the database for deletion.', async () => {
      const dto = new DeleteOrderDto();
      dto.id = 'deletionRejected';

      await expect(controller.deleteOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteOrder(dto)).rejects.toThrow('error');
    });

    it('should throw RpcException when the service could not delete the order.', async () => {
      const dto = new DeleteOrderDto();
      dto.id = 'notOrderDeleted';

      await expect(controller.deleteOrder(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteOrder(dto)).rejects.toThrow(
        "The order wasn't deleted",
      );
    });

    it('should call deleteOrder method of the service.', async () => {
      const dto = new DeleteOrderDto();
      dto.id = 'id';

      await controller.deleteOrder(dto);
      expect(service.deleteOrder).toHaveBeenCalled();
      expect(service.deleteOrder).toHaveBeenCalledWith(dto.id);
    });
  });
});
