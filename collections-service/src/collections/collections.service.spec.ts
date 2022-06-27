import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './interfaces/create-collection.interface';
import { UpdateCollectionDto } from './interfaces/update-collection.interface';

const collection = {
  id: 'id',
  name: 'name',
  description: 'description',
  image: 'image',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('CollectionsService Unit Tests', () => {
  let service: CollectionsService;

  const mockPrisma = {
    collection: {
      findUnique: jest.fn((query) => {
        const id = query.where.id;
        if (id === 'notFound') {
          return Promise.resolve(null);
        }
        if (id === 'rejectedFound') {
          return Promise.reject('Error performing findUnique method.');
        }
        return Promise.resolve(collection);
      }),
      findMany: jest.fn((query) => {
        const take = query.take;
        if (take === 0) {
          return Promise.resolve(null);
        }
        if (take < 0) {
          return Promise.reject('Error performing findMany method.');
        }
        return Promise.resolve([collection]);
      }),

      create: jest.fn((query) => {
        const data = query.data;

        if (!data.name || !data.image || !data.description) {
          return Promise.reject('Not enough fields provided.');
        }

        if (data.name === 'rejectedCreate') {
          return Promise.reject('Error performing create method.');
        }

        if (data.name === 'notCreated') {
          return Promise.resolve(null);
        }
        return Promise.resolve(collection);
      }),

      delete: jest.fn((query) => {
        const id = query.where.id;

        if (id === 'rejectedDelete') {
          return Promise.reject('Error performing delete method.');
        }

        if (id === 'notDeleted') {
          return Promise.resolve(null);
        }
        return Promise.resolve({
          message: 'Collection was deleted!',
        });
      }),

      update: jest.fn((query) => {
        const id = query.where.id;

        if (id === 'notUpdated') {
          return Promise.resolve(null);
        }
        if (id === 'rejectedUpdate') {
          return Promise.reject('Error performing update method.');
        }
        return Promise.resolve(collection);
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollectionsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<CollectionsService>(CollectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Tests for getCollection method.', () => {
    it('should call findUnique method of the prisma.', async () => {
      const id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      await service.getCollection(id);

      expect(mockPrisma.collection.findUnique).toHaveBeenCalled();
    });

    it('should return the requested collection.', async () => {
      const id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      const collectionFound = {
        id: collection.id,
        name: collection.name,
        description: collection.description,
        image: collection.image,
        createdAt: collection.createdAt.toUTCString(),
        updatedAt: collection.updatedAt.toUTCString(),
      };
      expect(await service.getCollection(id)).toStrictEqual(collectionFound);
    });

    it('should return null value when the collection does not exist.', async () => {
      const id = 'notFound';
      expect(await service.getCollection(id)).toBe(null);
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const id = 'rejectedFound';

      await expect(service.getCollection(id)).rejects.toThrow(RpcException);
      await expect(service.getCollection(id)).rejects.toThrow(
        'Error performing findUnique method.',
      );
    });
  });

  describe('Tests for getCollections method.', () => {
    it('should call findMany method of the prisma.', async () => {
      const page = 1;
      const itemsPerPage = 1;
      await service.getCollections(page, itemsPerPage);

      expect(mockPrisma.collection.findMany).toHaveBeenCalled();
    });

    it('should return the array of collections.', async () => {
      const page = 1;
      const itemsPerPage = 1;
      expect(await service.getCollections(page, itemsPerPage)).toStrictEqual([
        collection,
      ]);
    });

    it("should return null value when collections can't be found.", async () => {
      const page = 1;
      const itemsPerPage = 0;
      expect(await service.getCollections(page, itemsPerPage)).toBe(null);
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const page = 1;
      const itemsPerPage = -1;

      await expect(service.getCollections(page, itemsPerPage)).rejects.toThrow(
        RpcException,
      );
      await expect(service.getCollections(page, itemsPerPage)).rejects.toThrow(
        'Error performing findMany method.',
      );
    });
  });

  describe('Tests for deleteCollection method.', () => {
    it('should call delete method of the prisma.', async () => {
      const id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      await service.deleteCollection(id);

      expect(mockPrisma.collection.delete).toHaveBeenCalled();
    });

    it('should return the message about successful deletion of the collection.', async () => {
      const id = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      expect(await service.deleteCollection(id)).toStrictEqual({
        message: 'Collection was deleted!',
      });
    });

    it('should return null value when the collection does not exist.', async () => {
      const id = 'notDeleted';
      expect(await service.deleteCollection(id)).toBe(null);
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const id = 'rejectedDelete';

      await expect(service.deleteCollection(id)).rejects.toThrow(RpcException);
      await expect(service.deleteCollection(id)).rejects.toThrow(
        'Error performing delete method.',
      );
    });
  });

  describe('Tests for updateCollection method.', () => {
    it('should call update method of the prisma.', async () => {
      const data: UpdateCollectionDto = {
        id: 'id',
        name: 'name',
        description: 'description',
        image: 'image',
      };

      await service.updateCollection(data);

      expect(mockPrisma.collection.update).toHaveBeenCalled();
    });

    it('should return the updated collection.', async () => {
      const data: UpdateCollectionDto = {
        id: 'id',
        name: 'name',
        description: 'description',
        image: 'image',
      };

      expect(await service.updateCollection(data)).toStrictEqual(collection);
    });

    it('should return null value', async () => {
      const data: UpdateCollectionDto = {
        id: 'notUpdated',
        name: 'name',
        description: 'description',
        image: 'image',
      };

      expect(await service.updateCollection(data)).toBe(null);
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const data: UpdateCollectionDto = {
        id: 'rejectedUpdate',
        name: 'name',
        description: 'description',
        image: 'image',
      };

      await expect(service.updateCollection(data)).rejects.toThrow(
        RpcException,
      );
      await expect(service.updateCollection(data)).rejects.toThrow(
        'Error performing update method.',
      );
    });
  });

  describe('Tests for addCollection method.', () => {
    it('should call create method of the prisma.', async () => {
      const dto: CreateCollectionDto = {
        name: 'name',
        description: 'description',
        image: 'image',
      };

      await service.addCollection(dto);

      expect(mockPrisma.collection.create).toHaveBeenCalled();
    });

    it('should return the created collection.', async () => {
      const dto: CreateCollectionDto = {
        name: 'name',
        description: 'description',
        image: 'image',
      };

      expect(await service.addCollection(dto)).toStrictEqual(collection);
    });

    it("should throw RpcException when one of the fields isn't provided.", async () => {
      const dto: CreateCollectionDto = {
        name: 'name',
        description: 'description',
        image: '',
      };

      await expect(service.addCollection(dto)).rejects.toThrow(RpcException);
      await expect(service.addCollection(dto)).rejects.toThrow(
        'Not enough fields provided.',
      );
    });

    it('should be rejected when there is an error while querying the database.', async () => {
      const dto: CreateCollectionDto = {
        name: 'rejectedCreate',
        description: 'description',
        image: 'image',
      };

      await expect(service.addCollection(dto)).rejects.toThrow(RpcException);
      await expect(service.addCollection(dto)).rejects.toThrow(
        'Error performing create method.',
      );
    });
  });

  it('should return null value', async () => {
    const dto: CreateCollectionDto = {
      name: 'notCreated',
      description: 'description',
      image: 'image',
    };

    expect(await service.addCollection(dto)).toBe(null);
  });
});
