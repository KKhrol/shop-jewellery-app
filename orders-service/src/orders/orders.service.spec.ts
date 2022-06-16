import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';

const order = {
  id: 'orderId',
  totalPrice: 2982,
  userId: 'userId',
  deleted: false,
  createdAt: new Date('2022-07-04'),
  updatedAt: new Date('2022-07-04'),
  items: [
    {
      itemId: 'itemId1',
      image: 'image1',
      name: 'name1',
      quantity: 1,
      description: 'description1',
      metalImage: 'metalImage1',
      price: 133,
    },
    {
      itemId: 'itemId2',
      image: 'image2',
      name: 'name2',
      quantity: 2,
      description: 'description2',
      metalImage: 'metalImage2',
      price: 343,
    },
    {
      itemId: 'itemId3',
      image: 'image3',
      name: 'name3',
      quantity: 3,
      description: 'description3',
      metalImage: 'metalImage3',
      price: 721,
    },
  ],
};

const orderOutput = {
  orderId: 'orderId',
  userId: 'userId',
  varietyOfItems: order.items.length,
  totalPrice: 2982,
  itemInOrder: [
    {
      itemId: 'itemId1',
      image: 'image1',
      name: 'name1',
      quantity: 1,
      description: 'description1',
      metalImage: 'metalImage1',
      price: 133,
    },
    {
      itemId: 'itemId2',
      image: 'image2',
      name: 'name2',
      quantity: 2,
      description: 'description2',
      metalImage: 'metalImage2',
      price: 343,
    },
    {
      itemId: 'itemId3',
      image: 'image3',
      name: 'name3',
      quantity: 3,
      description: 'description3',
      metalImage: 'metalImage3',
      price: 721,
    },
  ],
  createdAt: 'Mon, 04 Jul 2022 00:00:00 GMT',
  updatedAt: 'Mon, 04 Jul 2022 00:00:00 GMT',
};

const validOrderToCreate = {
  userId: 'userId',
  itemInOrder: [
    {
      itemId: 'itemId1',
      image: 'image1',
      name: 'name1',
      quantity: 1,
      description: 'description1',
      metalImage: 'metalImage1',
      price: 133,
    },
    {
      itemId: 'itemId2',
      image: 'image2',
      name: 'name2',
      quantity: 2,
      description: 'description2',
      metalImage: 'metalImage2',
      price: 343,
    },
    {
      itemId: 'itemId3',
      image: 'image3',
      name: 'name3',
      quantity: 3,
      description: 'description3',
      metalImage: 'metalImage3',
      price: 721,
    },
  ],
  totalPrice: 2982,
};

const findManyOutput = [
  {
    id: 'id1',
    _count: { items: 11 },
    totalPrice: 923,
    updatedAt: new Date('2022-07-04'),
  },
  {
    id: 'id2',
    _count: { items: 4 },
    totalPrice: 874,
    updatedAt: new Date('2022-02-10'),
  },
  {
    id: 'id3',
    _count: { items: 24 },
    totalPrice: 4574,
    updatedAt: new Date('2022-06-27'),
  },
];

const getOrdersOutput = [
  {
    orderId: 'id1',
    varietyOfItems: 11,
    totalPrice: 923,
    updatedAt: 'Mon Jul 04 2022',
  },
  {
    orderId: 'id2',
    varietyOfItems: 4,
    totalPrice: 874,
    updatedAt: 'Thu Feb 10 2022',
  },
  {
    orderId: 'id3',
    varietyOfItems: 24,
    totalPrice: 4574,
    updatedAt: 'Mon Jun 27 2022',
  },
];

describe('OrdersService Unit Tests', () => {
  let service: OrdersService;

  const mockPrisma = {
    order: {
      findMany: jest.fn((query) => {
        const userId = query.where.userId;
        if (!userId) {
          return Promise.resolve(null);
        }
        if (userId === 'rejectedFound') {
          return Promise.reject('Error performing findMany method.');
        }
        return Promise.resolve(findManyOutput);
      }),

      findUnique: jest.fn((query) => {
        const orderId = query.where.id;
        if (orderId === 'notFound') {
          return Promise.resolve(null);
        }
        if (orderId === 'rejectedFind') {
          return Promise.reject('Error performing findUnique method.');
        }
        return Promise.resolve(order);
      }),
      create: jest.fn((query) => {
        const data = query.data;
        if (!data.totalPrice || !data.userId || !data.items) {
          return Promise.reject('Not enough fields provided.');
        }
        if (data.userId === 'rejectedCreate') {
          return Promise.reject('Error performing create method.');
        }
        return Promise.resolve(order);
      }),

      update: jest.fn((query) => {
        const id = query.where.id;
        if (!id) {
          return Promise.resolve(null);
        }
        if (id === 'rejectedUpdate') {
          return Promise.reject('Error performing update method.');
        }

        if (id === 'id') {
          return Promise.resolve({ id: 'id' });
        }
        return Promise.resolve({ message: 'Order was deleted!' });
      }),
    },
    item: {
      delete: jest.fn((query) => {
        const itemId = query.where.orderId_itemId.itemId;
        const orderId = query.where.orderId_itemId.orderId;
        if (!itemId || !orderId) {
          return Promise.resolve(null);
        }
        if (itemId === 'rejectedDeleted' || orderId === 'rejectedDeleted') {
          return Promise.reject('Error performing delete method of items.');
        }
        return Promise.resolve({ message: 'Item was deleted' });
      }),

      count: jest.fn((query) => {
        const orderId = query.where.orderId;

        if (orderId === 'rejectedCount') {
          return Promise.reject('Error performing count method.');
        }
        return Promise.resolve(order.items.length);
      }),
      findMany: jest.fn((query) => {
        const orderId = query.where.orderId;

        if (orderId === 'rejectedFound') {
          return Promise.reject('Error performing findMany method.');
        }
        if (!orderId) {
          return Promise.resolve(null);
        }
        const result = [];
        order.items.forEach(function (item) {
          result.push({ price: item.price, quantity: item.quantity });
        });
        return Promise.resolve(result);
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Tests for getOrderById method.', () => {
    it('should call findUnique and count methods of the prisma.', async () => {
      const orderId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      await service.getOrderById(orderId);

      expect(mockPrisma.order.findUnique).toHaveBeenCalled();
      expect(mockPrisma.item.count).toHaveBeenCalled();
    });

    it('should return the requested order.', async () => {
      const orderId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      expect(await service.getOrderById(orderId)).toStrictEqual(orderOutput);
    });

    describe('Tests with findUnique method of the prisma.', () => {
      it('should return null value when the order does not exist.', async () => {
        const orderId = 'notFound';
        expect(await service.getOrderById(orderId)).toBe(null);
      });

      it('should be rejected when there is an error while querying the database.', async () => {
        const orderId = 'rejectedFind';

        await expect(service.getOrderById(orderId)).rejects.toThrow(
          RpcException,
        );
        await expect(service.getOrderById(orderId)).rejects.toThrow(
          'Error performing findUnique method.',
        );
      });
    });

    describe('Test with count method of the prisma.', () => {
      it('should be rejected when there is an error while querying the database.', async () => {
        const orderId = 'rejectedCount';

        await expect(service.getOrderById(orderId)).rejects.toThrow(
          RpcException,
        );
        await expect(service.getOrderById(orderId)).rejects.toThrow(
          'Error performing count method.',
        );
      });
    });
  });

  describe('Tests for createOrder method.', () => {
    it('should call create method of the prisma.', async () => {
      await service.createOrder(validOrderToCreate);

      expect(mockPrisma.order.create).toHaveBeenCalled();
    });

    it('should return a new created order.', async () => {
      expect(await service.createOrder(validOrderToCreate)).toStrictEqual(
        orderOutput,
      );
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      validOrderToCreate.userId = 'rejectedCreate';

      await expect(service.createOrder(validOrderToCreate)).rejects.toThrow(
        RpcException,
      );
      await expect(service.createOrder(validOrderToCreate)).rejects.toThrow(
        'Error performing create method.',
      );
    });

    it('should be rejected when not all fields for creation are provided.', async () => {
      validOrderToCreate.userId = '';

      await expect(service.createOrder(validOrderToCreate)).rejects.toThrow(
        RpcException,
      );
      await expect(service.createOrder(validOrderToCreate)).rejects.toThrow(
        'Not enough fields provided.',
      );
    });
  });

  describe('Tests for getOrders method.', () => {
    it('should call order.findMany method of the prisma.', async () => {
      await service.getOrders({
        userId: 'userId',
        page: 1,
        ordersPerPage: 10,
        deleted: false,
      });

      expect(mockPrisma.order.findMany).toHaveBeenCalled();
    });

    it("should return the list of the user's orders.", async () => {
      expect(
        await service.getOrders({
          userId: 'userId',
          page: 1,
          ordersPerPage: 10,
          deleted: false,
        }),
      ).toStrictEqual(getOrdersOutput);
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      validOrderToCreate.userId = 'rejectedCreate';

      await expect(
        service.getOrders({
          userId: 'rejectedFound',
          page: 1,
          ordersPerPage: 10,
          deleted: false,
        }),
      ).rejects.toThrow(RpcException);
      await expect(
        service.getOrders({
          userId: 'rejectedFound',
          page: 1,
          ordersPerPage: 10,
          deleted: false,
        }),
      ).rejects.toThrow('Error performing findMany method.');
    });

    it("should return null value when the user' orders do not exist.", async () => {
      validOrderToCreate.userId = '';

      await expect(
        service.getOrders({
          userId: '',
          page: 1,
          ordersPerPage: 10,
          deleted: false,
        }),
      ).resolves.toBe(null);
    });
  });

  describe('Tests for getOrderTotalPrice method.', () => {
    it('should call item.findMany method of the prisma.', async () => {
      const orderId = 'orderId';
      await service.getOrderTotalPrice(orderId);

      expect(mockPrisma.item.findMany).toHaveBeenCalled();
    });

    it('should return the totalPrice of the order.', async () => {
      const orderId = 'orderId';
      expect(await service.getOrderTotalPrice(orderId)).toStrictEqual(
        order.totalPrice,
      );
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const orderId = 'rejectedFound';

      await expect(service.getOrderTotalPrice(orderId)).rejects.toThrow(
        RpcException,
      );
      await expect(service.getOrderTotalPrice(orderId)).rejects.toThrow(
        'Error performing findMany method.',
      );
    });

    it("should return null value when the user's orders do not exist.", async () => {
      const orderId = '';

      await expect(service.getOrderTotalPrice(orderId)).resolves.toBe(null);
    });
  });

  describe('Tests for deleteItem method.', () => {
    it('should call item.delete method of the prisma.', async () => {
      const query = {
        orderId: 'orderId',
        itemId: 'itemId',
      };
      await service.deleteItem(query);

      expect(mockPrisma.item.delete).toHaveBeenCalled();
    });

    it('should return the message about the successfull deletion of the item.', async () => {
      const query = {
        orderId: 'orderId',
        itemId: 'itemId',
      };
      expect(await service.deleteItem(query)).toStrictEqual({
        message: 'Item was deleted',
      });
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const query = {
        orderId: 'rejectedDeleted',
        itemId: 'itemId',
      };

      await expect(service.deleteItem(query)).rejects.toThrow(RpcException);
      await expect(service.deleteItem(query)).rejects.toThrow(
        'Error performing delete method of items.',
      );
    });

    it("should return null value when the user's orders do not exist.", async () => {
      const query = {
        orderId: '',
        itemId: 'itemId',
      };

      await expect(service.deleteItem(query)).resolves.toBe(null);
    });
  });

  describe('Tests for deleteOrder method.', () => {
    it('should call order.update method of the prisma.', async () => {
      const orderId = 'orderId';
      await service.deleteOrder(orderId);

      expect(mockPrisma.order.update).toHaveBeenCalled();
    });

    it('should return the message that order was successfully deleted.', async () => {
      const orderId = 'orderId';
      expect(await service.deleteOrder(orderId)).toStrictEqual({
        message: 'Order was deleted!',
      });
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const orderId = 'rejectedUpdate';

      await expect(service.deleteOrder(orderId)).rejects.toThrow(RpcException);
      await expect(service.deleteOrder(orderId)).rejects.toThrow(
        'Error performing update method.',
      );
    });

    it("should return null value when the user's order does not exist.", async () => {
      const orderId = '';

      await expect(service.deleteOrder(orderId)).resolves.toBe(null);
    });
  });

  describe('Tests for updateOrder method.', () => {
    it('should call order.update method of the prisma.', async () => {
      const updateOrderDto = {
        orderId: 'id',
        discount: 11,
        oldTotalPrice: 1112,
      };
      await service.updateOrder(updateOrderDto);

      expect(mockPrisma.order.update).toHaveBeenCalled();
    });

    it('should return the id of the updated order.', async () => {
      const updateOrderDto = {
        orderId: 'id',
        discount: 11,
        oldTotalPrice: 1112,
      };
      expect(await service.updateOrder(updateOrderDto)).toStrictEqual({
        id: 'id',
      });
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const updateOrderDto = {
        orderId: 'rejectedUpdate',
        discount: 11,
        oldTotalPrice: 1112,
      };

      await expect(service.updateOrder(updateOrderDto)).rejects.toThrow(
        RpcException,
      );
      await expect(service.updateOrder(updateOrderDto)).rejects.toThrow(
        'Error performing update method.',
      );
    });

    it("should return null value when the user's order does not exist.", async () => {
      const updateOrderDto = {
        orderId: '',
        discount: 11,
        oldTotalPrice: 1112,
      };

      await expect(service.updateOrder(updateOrderDto)).resolves.toBe(null);
    });
  });
});
