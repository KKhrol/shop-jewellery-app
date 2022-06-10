import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewsService } from './reviews.service';

const listOfReviews = [
  {
    itemId: 'itemId1',
    mark: 1,
    item: {
      image: 'image1',
      name: 'name1',
      metalImage: 'metalImage1',
    },
  },
  {
    itemId: 'itemId2',
    mark: 2,
    item: {
      image: 'image2',
      name: 'name2',
      metalImage: 'metalImage2',
    },
  },
  {
    itemId: 'itemId3',
    mark: 3,
    item: {
      image: 'image3',
      name: 'name3',
      metalImage: 'metalImage3',
    },
  },
];

const listOfReviewsOutput = [
  {
    itemId: 'itemId1',
    mark: 1,
    image: 'image1',
    name: 'name1',
    metalImage: 'metalImage1',
  },
  {
    itemId: 'itemId2',
    mark: 2,
    image: 'image2',
    name: 'name2',
    metalImage: 'metalImage2',
  },
  {
    itemId: 'itemId3',
    mark: 3,
    image: 'image3',
    name: 'name3',
    metalImage: 'metalImage3',
  },
];

const itemRating = {
  _count: {
    userId: 45,
  },
  _avg: {
    mark: 4.22,
  },
};

const itemRatingOutput = {
  voters: 45,
  mark: 4.22,
};

describe('ReviewsService Unit Tests', () => {
  let service: ReviewsService;

  const mockPrisma = {
    review: {
      findMany: jest.fn((query) => {
        const userId = query.where.userId;
        if (!userId) {
          return Promise.resolve(null);
        }
        return Promise.resolve(listOfReviews);
      }),

      aggregate: jest.fn((query) => {
        const itemId = query.where.itemId;
        if (!itemId) {
          return Promise.resolve(null);
        }
        return Promise.resolve(itemRating);
      }),

      deleteMany: jest.fn((query) => {
        const userId = query.where.userId;
        if (!userId) {
          return Promise.resolve(null);
        }
        return Promise.resolve({});
      }),

      create: jest.fn((query) => {
        const userId = query.data.userId;
        if (!userId) {
          return Promise.resolve(null);
        }

        const data = query.data.item.connectOrCreate.create;
        if (!data.name || !data.metalImage || !data.image) {
          return Promise.reject('error');
        }
        return Promise.resolve({ query });
      }),

      update: jest.fn((query) => {
        const itemId = query.where.userId_itemId.itemId;
        const userId = query.where.userId_itemId.userId;
        if (!itemId || !userId) {
          return Promise.resolve(null);
        }
        return Promise.resolve({ query });
      }),
    },
    item: {
      delete: jest.fn((query) => {
        const itemId = query.where.id;
        if (!itemId) {
          return Promise.resolve(null);
        }
        return Promise.resolve({});
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Tests for getRatingsByUserId method.', () => {
    it("should return the array of user's ratings", async () => {
      const userId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      expect(await service.getRatingsByUserId(userId)).toStrictEqual(
        listOfReviewsOutput,
      );
    });

    it('should return null value', async () => {
      const userId = '';
      expect(await service.getRatingsByUserId(userId)).toBe(null);
    });
  });

  describe('Tests for getRatingByItemId method.', () => {
    it("should return the array of the item's ratings", async () => {
      const itemId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      expect(await service.getRatingByItemId(itemId)).toStrictEqual(
        itemRatingOutput,
      );
    });

    it('should return null value', async () => {
      const itemId = '';
      expect(await service.getRatingByItemId(itemId)).toBe(null);
    });
  });

  describe('Tests for deleteRatingsByUserId method.', () => {
    it('should return the object', async () => {
      const userId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      expect(await service.deleteRatingsByUserId(userId)).toBeInstanceOf(
        Object,
      );
    });

    it('should return null value', async () => {
      const userId = '';
      expect(await service.deleteRatingsByUserId(userId)).toBe(null);
    });
  });

  describe('Tests for deleteRatingByItemId method.', () => {
    it('should return the object', async () => {
      const itemId = '066edb38-8565-42da-8ed9-1cc9244e7e5e';
      expect(await service.deleteRatingByItemId(itemId)).toBeInstanceOf(Object);
    });

    it('should return null value', async () => {
      const itemId = '';
      expect(await service.deleteRatingsByUserId(itemId)).toBe(null);
    });
  });

  describe('Tests for createRating method.', () => {
    it('should return the object', async () => {
      const rating = {
        itemId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
        userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
        mark: 4,
        image: 'image',
        name: 'name',
        metalImage: 'metalImage',
      };
      expect(await service.createRating(rating)).toBeInstanceOf(Object);
      expect(await service.createRating(rating)).toStrictEqual(
        itemRatingOutput,
      );
    });

    it('should return null value', async () => {
      const rating = {
        itemId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
        userId: '',
        mark: 4,
        image: 'image',
        name: 'name',
        metalImage: 'metalImage',
      };
      expect(await service.createRating(rating)).toBe(null);
    });

    it('should throw the exception', async () => {
      const rating = {
        itemId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
        userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
        mark: 4,
        image: null,
        name: 'name',
        metalImage: 'metalImage',
      };
      await expect(service.createRating(rating)).rejects.toThrow(RpcException);
      await expect(service.createRating(rating)).rejects.toThrow('error');
    });
  });

  describe('Tests for updateRating method.', () => {
    it('tests update of the rating. It should return the object', async () => {
      const rating = {
        itemId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
        userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
        mark: 4,
      };
      expect(await service.updateRating(rating)).toBeInstanceOf(Object);
      expect(await service.updateRating(rating)).toStrictEqual(
        itemRatingOutput,
      );
    });

    it('It should return null value', async () => {
      const rating = {
        itemId: '',
        userId: '066edb38-8565-42da-8ed9-1cc9244e7e5e',
        mark: 4,
      };
      expect(await service.updateRating(rating)).toBe(null);
    });
  });
});
