import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryService } from './inventory.service';

describe('InventoryService Unit Tests', () => {
  let service: InventoryService;

  const mockPrisma = {
    stock: {
      findUnique: jest.fn((query) => {
        const itemId = query.where.itemId;
        if (itemId === 'notFound') {
          return Promise.resolve(null);
        }
        if (itemId === 'rejectedFound') {
          return Promise.reject('Error performing findUnique method.');
        }
        return Promise.resolve({ quantity: 111 });
      }),
      create: jest.fn((query) => {
        const data = query.data;

        if (!data.quantity) {
          return Promise.reject('Not enough fields provided.');
        }
        if (data.itemId === 'rejectedCreate') {
          return Promise.reject('Error performing create method.');
        }
        return Promise.resolve({
          itemId: data.itemId,
          quantity: data.quantity,
        });
      }),
      delete: jest.fn((query) => {
        const itemId = query.where.itemId;

        if (itemId === 'rejectedDelete') {
          return Promise.reject('Error performing delete method.');
        }

        if (itemId === 'notDeleted') {
          return Promise.resolve(null);
        }
        return Promise.resolve({
          message: "The item's inventory was deleted!",
        });
      }),
      upsert: jest.fn((query) => {
        const itemId = query.where.itemId;
        const update = query.update;

        if (itemId === 'notUpserted') {
          return Promise.resolve(null);
        }
        if (!update.quantity) {
          return Promise.reject('Not enough fields provided.');
        }
        if (itemId === 'rejectedUpsert') {
          return Promise.reject('Error performing upsert method.');
        }
        return Promise.resolve({
          itemId: itemId,
          quantity: update.quantity,
        });
      }),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Tests for addInventory method.', () => {
    it('should call create method of the prisma.', async () => {
      const dto = new CreateInventoryDto();
      dto.id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      dto.quantity = 111;

      await service.addInventory(dto);

      expect(mockPrisma.stock.create).toHaveBeenCalled();
    });

    it('should return the created inventory.', async () => {
      const dto = new CreateInventoryDto();
      dto.id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      dto.quantity = 111;

      expect(await service.addInventory(dto)).toStrictEqual({
        itemId: dto.id,
        quantity: dto.quantity,
      });
    });

    it("should throw RpcException when the quantity field isn't provided.", async () => {
      const dto = new CreateInventoryDto();
      dto.id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';

      await expect(service.addInventory(dto)).rejects.toThrow(RpcException);
      await expect(service.addInventory(dto)).rejects.toThrow(
        'Not enough fields provided.',
      );
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const dto = new CreateInventoryDto();
      dto.id = 'rejectedCreate';
      dto.quantity = 111;

      await expect(service.addInventory(dto)).rejects.toThrow(RpcException);
      await expect(service.addInventory(dto)).rejects.toThrow(
        'Error performing create method.',
      );
    });
  });

  describe('Tests for getInventory method.', () => {
    it('should call findUnique method of the prisma.', async () => {
      const itemId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      await service.getInventory(itemId);

      expect(mockPrisma.stock.findUnique).toHaveBeenCalled();
    });

    it('should return the requested inventory.', async () => {
      const itemId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      expect(await service.getInventory(itemId)).toStrictEqual({
        quantity: 111,
      });
    });

    it('should return null value when the inventory does not exist.', async () => {
      const itemId = 'notFound';
      expect(await service.getInventory(itemId)).toBe(null);
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const itemId = 'rejectedFound';

      await expect(service.getInventory(itemId)).rejects.toThrow(RpcException);
      await expect(service.getInventory(itemId)).rejects.toThrow(
        'Error performing findUnique method.',
      );
    });
  });

  describe('Tests for deleteInventory method.', () => {
    it('should call delete method of the prisma.', async () => {
      const itemId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      await service.deleteInventory(itemId);

      expect(mockPrisma.stock.delete).toHaveBeenCalled();
    });

    it('should return the message about successful deletion of the inventory.', async () => {
      const itemId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      expect(await service.deleteInventory(itemId)).toStrictEqual({
        message: "The item's inventory was deleted!",
      });
    });

    it('should return null value when the inventory does not exist.', async () => {
      const itemId = 'notDeleted';
      expect(await service.deleteInventory(itemId)).toBe(null);
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const itemId = 'rejectedDelete';

      await expect(service.deleteInventory(itemId)).rejects.toThrow(
        RpcException,
      );
      await expect(service.deleteInventory(itemId)).rejects.toThrow(
        'Error performing delete method.',
      );
    });
  });

  describe('Tests for updateInventory method.', () => {
    it('should call upsert method of the prisma.', async () => {
      const data = new UpdateInventoryDto();
      data.id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      data.quantity = 111;

      await service.updateInventory(data);

      expect(mockPrisma.stock.upsert).toHaveBeenCalled();
    });

    it('should return the upserted inventory.', async () => {
      const data = new UpdateInventoryDto();
      data.id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      data.quantity = 111;

      expect(await service.updateInventory(data)).toStrictEqual({
        itemId: data.id,
        quantity: data.quantity,
      });
    });

    it("should throw RpcException when the quantity field isn't provided.", async () => {
      const data = new UpdateInventoryDto();
      data.id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';

      await expect(service.updateInventory(data)).rejects.toThrow(RpcException);
      await expect(service.updateInventory(data)).rejects.toThrow(
        'Not enough fields provided.',
      );
    });

    it('should return null value', async () => {
      const data = new UpdateInventoryDto();
      data.id = 'notUpserted';
      data.quantity = 111;

      expect(await service.updateInventory(data)).toBe(null);
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const data = new UpdateInventoryDto();
      data.id = 'rejectedUpsert';
      data.quantity = 111;

      await expect(service.updateInventory(data)).rejects.toThrow(RpcException);
      await expect(service.updateInventory(data)).rejects.toThrow(
        'Error performing upsert method.',
      );
    });
  });
});
