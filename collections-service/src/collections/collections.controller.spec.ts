import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { CollectionById } from './interfaces/collection-by-id.interface';
import { CollectionFullInfo } from './interfaces/collection-full-info.interface';
import { Collection } from './interfaces/collection.interface';
import { CollectionsOnPage } from './interfaces/collections-page.interface';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { DeleteCollectionDto } from './interfaces/delete-collection.interface';
import { ResponseData } from './interfaces/response-data.interface';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';

describe('CollectionsController Unit Tests', () => {
  let controller: CollectionsController;
  let service: CollectionsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: CollectionsService,
      useFactory: () => ({
        getCollection: jest.fn((id: string) => {
          if (!id) {
            return null;
          }
          if (id === 'findRejected') {
            throw new RpcException('Error performing getCollection method.');
          }
          return new CollectionFullInfo();
        }),

        getCollections: jest.fn((page: number, itemsPerPage: number) => {
          if (!itemsPerPage) {
            return null;
          }
          if (page === -1) {
            throw new RpcException('Error performing getCollections method.');
          }
          return [new Collection()];
        }),

        addCollection: jest.fn((data: CreateCollectionDto) => {
          if (!data.name || !data.description || !data.image) {
            return null;
          }

          if (data.name === 'creationRejected') {
            throw new RpcException('Error performing addCollection method.');
          }
          return new Collection();
        }),

        deleteCollection: jest.fn((id: string) => {
          if (!id) {
            return null;
          }
          if (id === 'deletionRejected') {
            throw new RpcException('Error performing deleteCollection method.');
          }
          return new DeleteCollectionDto();
        }),

        updateCollection: jest.fn((data: UpdateCollectionDto) => {
          if (!data.id) {
            return null;
          }
          if (data.id === 'updateRejected') {
            throw new RpcException('Error performing updateCollection method.');
          }

          return new Collection();
        }),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionsController],
      providers: [CollectionsService, ApiServiceProvider],
    }).compile();

    controller = module.get<CollectionsController>(CollectionsController);
    service = module.get<CollectionsService>(CollectionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Tests for findOne method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new CollectionById();
      dto.id = 'id';

      expect(controller.findOne(dto)).not.toEqual(null);
      expect(controller.findOne(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.findOne(dto)).resolves.toMatchObject(
        new ResponseData<Collection>(),
      );
    });
    it('should throw RpcException when itemId is not provided.', async () => {
      const dto = new CollectionById();

      await expect(controller.findOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.findOne(dto)).rejects.toThrow(
        "The collection wasn't found!",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new CollectionById();
      dto.id = 'findRejected';
      await expect(controller.findOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.findOne(dto)).rejects.toThrow(
        'Error performing getCollection method.',
      );
    });

    it('should call getCollection method of the service.', async () => {
      const dto = new CollectionById();
      dto.id = 'id';

      await controller.findOne(dto);
      expect(service.getCollection).toHaveBeenCalled();
      expect(service.getCollection).toHaveBeenCalledWith(dto.id);
    });
  });

  describe('Tests for findMany method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new CollectionsOnPage();
      dto.itemsPerPage = 1;
      dto.page = 1;

      expect(controller.findMany(dto)).not.toEqual(null);
      expect(controller.findMany(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.findMany(dto)).resolves.toMatchObject(
        new ResponseData<Collection[]>(),
      );
    });
    it("should throw RpcException when collections can't be found.", async () => {
      const dto = new CollectionsOnPage();
      dto.page = 1;

      await expect(controller.findMany(dto)).rejects.toThrow(RpcException);
      await expect(controller.findMany(dto)).rejects.toThrow(
        'No collections found!',
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new CollectionsOnPage();
      dto.itemsPerPage = 1;
      dto.page = -1;

      await expect(controller.findMany(dto)).rejects.toThrow(RpcException);
      await expect(controller.findMany(dto)).rejects.toThrow(
        'Error performing getCollections method.',
      );
    });

    it('should call getCollections method of the service.', async () => {
      const dto = new CollectionsOnPage();
      dto.itemsPerPage = 1;
      dto.page = 1;

      await controller.findMany(dto);
      expect(service.getCollections).toHaveBeenCalled();
      expect(service.getCollections).toHaveBeenCalledWith(
        dto.itemsPerPage,
        dto.page,
      );
    });
  });

  describe('Tests for postCollection method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new CreateCollectionDto();
      dto.name = 'name';
      dto.image = 'image';
      dto.description = 'descroption';

      expect(controller.postCollection(dto)).not.toEqual(null);
      expect(controller.postCollection(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.postCollection(dto)).resolves.toMatchObject(
        new ResponseData<Collection>(),
      );
    });

    it('should call addCollection method of the service.', async () => {
      const dto = new CreateCollectionDto();
      dto.name = 'name';
      dto.image = 'image';
      dto.description = 'descroption';

      await controller.postCollection(dto);
      expect(service.addCollection).toHaveBeenCalled();
      expect(service.addCollection).toHaveBeenCalledWith(dto);
    });

    it('should throw RpcException when any of the mandatory properties are not provided.', async () => {
      const dto = new CreateCollectionDto();

      await expect(controller.postCollection(dto)).rejects.toThrow(
        RpcException,
      );
      await expect(controller.postCollection(dto)).rejects.toThrow(
        "The collection wasn't inserted!",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new CreateCollectionDto();
      dto.name = 'creationRejected';
      dto.image = 'image';
      dto.description = 'descroption';

      await expect(controller.postCollection(dto)).rejects.toThrow(
        RpcException,
      );
      await expect(controller.postCollection(dto)).rejects.toThrow(
        'Error performing addCollection method.',
      );
    });
  });

  describe('Tests for deleteOne method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new CollectionById();
      dto.id = 'id';

      expect(controller.deleteOne(dto)).not.toEqual(null);
      expect(controller.deleteOne(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.deleteOne(dto)).resolves.toMatchObject(
        new ResponseData<DeleteCollectionDto>(),
      );
    });

    it('should call deleteCollection method of the service.', async () => {
      const dto = new CollectionById();
      dto.id = 'id';

      await controller.deleteOne(dto);
      expect(service.deleteCollection).toHaveBeenCalled();
      expect(service.deleteCollection).toHaveBeenCalledWith(dto.id);
    });

    it('should throw RpcException when id is not provided.', async () => {
      const dto = new CollectionById();

      await expect(controller.deleteOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteOne(dto)).rejects.toThrow(
        "The collection wasn't deleted!",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new CollectionById();
      dto.id = 'deletionRejected';

      await expect(controller.deleteOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.deleteOne(dto)).rejects.toThrow(
        'Error performing deleteCollection method.',
      );
    });
  });

  describe('Tests for updateOne method.', () => {
    it('checks that returning value is correct.', async () => {
      const dto = new UpdateCollectionDto();
      dto.id = 'id';

      expect(controller.updateOne(dto)).not.toEqual(null);
      expect(controller.updateOne(dto)).resolves.toBeInstanceOf(Object);
      expect(controller.updateOne(dto)).resolves.toMatchObject(
        new ResponseData<Collection>(),
      );
    });

    it('should call updateCollection method of the service.', async () => {
      const dto = new UpdateCollectionDto();
      dto.id = 'id';

      await controller.updateOne(dto);
      expect(service.updateCollection).toHaveBeenCalled();
      expect(service.updateCollection).toHaveBeenCalledWith(dto);
    });

    it('should throw RpcException when id is not provided.', async () => {
      const dto = new UpdateCollectionDto();

      await expect(controller.updateOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOne(dto)).rejects.toThrow(
        "The collection wasn't updated!",
      );
    });

    it('should throw RpcException when the service encounters the error while querying the database.', async () => {
      const dto = new UpdateCollectionDto();
      dto.id = 'updateRejected';

      await expect(controller.updateOne(dto)).rejects.toThrow(RpcException);
      await expect(controller.updateOne(dto)).rejects.toThrow(
        'Error performing updateCollection method.',
      );
    });
  });
});
