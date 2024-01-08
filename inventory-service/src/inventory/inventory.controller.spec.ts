import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { DeleteInventoryDto } from './dto/deleted-inventory-output.dto';
import { InventoryByItemId } from './dto/inventory-by-item-id.dto';
import { Inventory } from './dto/inventory.dto';
import { ResponseData } from './dto/response-data.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';

describe('InventoryController Unit Tests', () => {
  let controller: InventoryController;
  let service: InventoryService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: InventoryService,
      useFactory: () => ({
        getInventory: jest.fn((id: string) => {
          if (!id) {
            return null;
          }
          if (id === 'findRejected') {
            throw new RpcException('Error performing getInventory method.');
          }
          return new Inventory();
        }),

        addInventory: jest.fn((data: CreateInventoryDto) => {
          if (!data.id) {
            return null;
          }

          if (data.id === 'findRejected') {
            throw new RpcException('Error performing addInventory method.');
          }
          return new Inventory();
        }),

        deleteInventory: jest.fn((id: string) => {
          if (!id) {
            return null;
          }
          if (id === 'deletionRejected') {
            throw new RpcException('Error performing deleteInventory method.');
          }
          return new DeleteInventoryDto();
        }),

        updateInventory: jest.fn((data: UpdateInventoryDto) => {
          if (!data.id) {
            return null;
          }
          if (data.id === 'updateRejected') {
            throw new RpcException('Error performing updateInventory method.');
          }

          return new Inventory();
        }),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryController],
      providers: [InventoryService, ApiServiceProvider],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
    service = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Tests for findOne method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new InventoryByItemId();
      dto.id = 'id';

      expect(controller.findOne(dto)).not.toEqual(null);
      expect(controller.findOne(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.findOne(dto)).resolves.toMatchObject(
        new ResponseData<Inventory>(),
      );
    });
    it('should throw RpcException when itemId is not provided.', async () => {
      const dto = new InventoryByItemId();
      dto.id = '';
      await expect(controller.findOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.findOne(dto)).rejects.toThrow(
        "The inventory wasn't found",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new InventoryByItemId();
      dto.id = 'findRejected';
      await expect(controller.findOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.findOne(dto)).rejects.toThrow(
        'Error performing getInventory method.',
      );
    });

    it('should call getInventory method of the service.', async () => {
      const dto = new InventoryByItemId();
      dto.id = 'id';

      await controller.findOne(dto);
      expect(service.getInventory).toHaveBeenCalled();
      expect(service.getInventory).toHaveBeenCalledWith(dto.id);
    });
  });

  describe('Tests for postOne method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new CreateInventoryDto();
      dto.id = 'id';

      expect(controller.postOne(dto)).not.toEqual(null);
      expect(controller.postOne(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.postOne(dto)).resolves.toMatchObject(
        new ResponseData<Inventory>(),
      );
    });
    it('should throw RpcException when itemId is not provided.', async () => {
      const dto = new CreateInventoryDto();
      dto.id = '';
      await expect(controller.postOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.postOne(dto)).rejects.toThrow(
        "The item inventory wasn't added",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new CreateInventoryDto();
      dto.id = 'findRejected';
      await expect(controller.postOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.postOne(dto)).rejects.toThrow(
        'Error performing addInventory method.',
      );
    });

    it('should call addInventory method of the service.', async () => {
      const dto = new CreateInventoryDto();
      dto.id = 'id';

      await controller.postOne(dto);
      expect(service.addInventory).toHaveBeenCalled();
      expect(service.addInventory).toHaveBeenCalledWith(dto);
    });
  });

  describe('Tests for deleteOne method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new InventoryByItemId();
      dto.id = 'id';

      expect(controller.deleteOne(dto)).not.toEqual(null);
      expect(controller.deleteOne(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.deleteOne(dto)).resolves.toMatchObject(
        new ResponseData<DeleteInventoryDto>(),
      );
    });
    it('should throw RpcException when itemId is not provided.', async () => {
      const dto = new InventoryByItemId();
      dto.id = '';
      await expect(controller.deleteOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteOne(dto)).rejects.toThrow(
        "The item's inventory wasn't deleted.",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new InventoryByItemId();
      dto.id = 'deletionRejected';

      await expect(controller.deleteOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteOne(dto)).rejects.toThrow(
        'Error performing deleteInventory method.',
      );
    });

    it('should call addInventory method of the service.', async () => {
      const dto = new InventoryByItemId();
      dto.id = 'id';

      await controller.deleteOne(dto);
      expect(service.deleteInventory).toHaveBeenCalled();
      expect(service.deleteInventory).toHaveBeenCalledWith(dto.id);
    });
  });

  describe('Tests for updateOne method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new UpdateInventoryDto();
      dto.id = 'id';
      dto.quantity = 11;

      expect(controller.updateOne(dto)).not.toEqual(null);
      expect(controller.updateOne(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.updateOne(dto)).resolves.toMatchObject(
        new ResponseData<Inventory>(),
      );
    });
    it('should throw RpcException when itemId is not provided.', async () => {
      const dto = new UpdateInventoryDto();
      dto.id = '';
      dto.quantity = 11;

      await expect(controller.updateOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOne(dto)).rejects.toThrow(
        "The item's inventory wasn't upserted.",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new UpdateInventoryDto();
      dto.id = 'updateRejected';
      dto.quantity = 11;

      await expect(controller.updateOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOne(dto)).rejects.toThrow(
        'Error performing updateInventory method.',
      );
    });

    it('should call updateInventory method of the service.', async () => {
      const dto = new UpdateInventoryDto();
      dto.id = 'id';
      dto.quantity = 11;

      await controller.updateOne(dto);
      expect(service.updateInventory).toHaveBeenCalled();
      expect(service.updateInventory).toHaveBeenCalledWith(dto);
    });

    it("should throw RpcException when the quantity field isn't provided.", async () => {
      const dto = new UpdateInventoryDto();
      dto.id = 'id';

      await expect(controller.updateOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOne(dto)).rejects.toThrow(
        'No quantity was privided.',
      );
    });
  });
});
