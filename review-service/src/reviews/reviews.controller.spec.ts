/* eslint-disable @typescript-eslint/no-empty-function */
import { RpcException } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateReviewDto } from './interfaces/create-review.interface';
import { DeleteReviewDto } from './interfaces/deleted-review-output.interface';
import { ReviewByItemId } from './interfaces/review-by-item-id.interface';
import { ReviewByUserId } from './interfaces/review-by-user-id.interface';
import { ReviewInUserRatingList } from './interfaces/review-in-user-rating-list.interface';
import { Review } from './interfaces/review.interface';
import { UpdateReviewDto } from './interfaces/update-review.interface';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

describe('ReviewsController Unit Tests', () => {
  let controller: ReviewsController;
  let service: ReviewsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: ReviewsService,
      useFactory: () => ({
        getRatingByItemId: jest.fn((itemId: string) => {
          return itemId ? new Review() : null;
        }),
        deleteRatingByItemId: jest.fn((itemId: string) => {
          return itemId ? new DeleteReviewDto() : null;
        }),
        getRatingsByUserId: jest.fn((userId: string) => {
          return userId ? [new ReviewInUserRatingList()] : null;
        }),
        deleteRatingsByUserId: jest.fn((userId: string) => {
          return userId ? new DeleteReviewDto() : null;
        }),
        createRating: jest.fn((data: CreateReviewDto) => {
          return data.userId ? new Review() : null;
        }),
        updateRating: jest.fn((data: UpdateReviewDto) => {
          return data.userId ? new Review() : null;
        }),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [ReviewsService, ApiServiceProvider],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('checks work of findOne method of the controller', async () => {
    const dto = new ReviewByItemId();
    dto.id = '3b7kj89';
    expect(controller.findOne(dto)).not.toEqual(null);
    expect(controller.findOne(dto)).resolves.toBeInstanceOf(Object);
  });

  it('checks work of deleteOne method of the controller', () => {
    const dto = new ReviewByItemId();
    dto.id = '3b7kj89';
    expect(controller.deleteOne(dto)).not.toEqual(null);
  });

  it('checks work of findMany method of the controller', () => {
    const dto = new ReviewByUserId();
    dto.userId = '3b7kj89';
    expect(controller.findMany(dto)).not.toEqual(null);
    expect(controller.findMany(dto)).resolves.toBeInstanceOf(Object);
  });

  it('checks work of deleteMany method of the controller', () => {
    const dto = new ReviewByUserId();
    dto.userId = '3b7kj89';
    expect(controller.deleteMany(dto)).not.toEqual(null);
  });

  it('checks work of addOne method of the controller', () => {
    const dto = new CreateReviewDto();
    dto.itemId = '3b7kj89';
    dto.userId = '3b7kj89';
    expect(controller.addOne(dto)).not.toEqual(null);
    expect(controller.addOne(dto)).resolves.toBeInstanceOf(Object);
  });

  it('checks work of updateOne method of the controller', () => {
    const dto = new UpdateReviewDto();
    dto.itemId = '3b7kj89';
    dto.userId = '3b7kj89';
    expect(controller.updateOne(dto)).not.toEqual(null);
    expect(controller.updateOne(dto)).resolves.toBeInstanceOf(Object);
  });

  it('should throw RpcException from findOne method of the controller when itemId is not provided', async () => {
    const dto = new ReviewByItemId();
    await expect(controller.findOne(dto)).rejects.toThrow(RpcException);
    await expect(controller.findOne(dto)).rejects.toThrow(
      "The rating of the item wasn't found!",
    );
  });

  it('should throw RpcException from deleteOne method of the controller when itemId is not provided', async () => {
    const dto = new ReviewByItemId();
    await expect(controller.deleteOne(dto)).rejects.toThrow(RpcException);
    await expect(controller.deleteOne(dto)).rejects.toThrow(
      "The item wasn't deleted.",
    );
  });

  it('should throw RpcException from findMany method of the controller when userId is not provided', async () => {
    const dto = new ReviewByUserId();
    await expect(controller.findMany(dto)).rejects.toThrow(RpcException);
    await expect(controller.findMany(dto)).rejects.toThrow(
      'No ratings were found!',
    );
  });

  it('should throw RpcException from deleteMany method of the controller when userId is not provided', async () => {
    const dto = new ReviewByUserId();
    await expect(controller.deleteMany(dto)).rejects.toThrow(RpcException);
    await expect(controller.deleteMany(dto)).rejects.toThrow(
      "Rating of the item wasn't deleted!",
    );
  });

  it('should throw RpcException from addOne method of the controller  when itemId is not provided', async () => {
    const dto = new CreateReviewDto();
    await expect(controller.addOne(dto)).rejects.toThrow(RpcException);
    await expect(controller.addOne(dto)).rejects.toThrow(
      'No itemId was provided.',
    );
  });

  it('should throw RpcException from addOne method of the controller when userId (can be any other property) is not provided', async () => {
    const dto = new CreateReviewDto();
    dto.itemId = '3b7kj89';
    await expect(controller.addOne(dto)).rejects.toThrow(RpcException);
    await expect(controller.addOne(dto)).rejects.toThrow(
      "The rating wasn't created.",
    );
  });

  it('should throw RpcException from updateOne method of the controller when itemId is not provided', async () => {
    const dto = new UpdateReviewDto();
    await expect(controller.updateOne(dto)).rejects.toThrow(RpcException);
    await expect(controller.updateOne(dto)).rejects.toThrow(
      'No itemId was provided.',
    );
  });

  it('should throw RpcException from updateOne method of the controller when userId is not provided', async () => {
    const dto = new UpdateReviewDto();
    dto.itemId = '3b7kj89';
    await expect(controller.updateOne(dto)).rejects.toThrow(RpcException);
    await expect(controller.updateOne(dto)).rejects.toThrow(
      "The rating wasn't updated.",
    );
  });

  it('should call getRatingByItemId method of the service', async () => {
    const dto = new ReviewByItemId();
    dto.id = '3b7kj89';
    await controller.findOne(dto);
    expect(service.getRatingByItemId).toHaveBeenCalled();
    expect(service.getRatingByItemId).toHaveBeenCalledWith(dto.id);
  });

  it('should call deleteRatingByItemId method of the service', () => {
    const dto = new ReviewByItemId();
    dto.id = '3b7kj89';
    controller.deleteOne(dto);
    expect(service.deleteRatingByItemId).toHaveBeenCalled();
    expect(service.deleteRatingByItemId).toHaveBeenCalledWith(dto.id);
  });

  it('should call getRatingsByUserId method of the service', () => {
    const dto = new ReviewByUserId();
    dto.userId = '3b7kj89';
    controller.findMany(dto);
    expect(service.getRatingsByUserId).toHaveBeenCalled();
    expect(service.getRatingsByUserId).toHaveBeenCalledWith(dto.userId);
  });

  it('should call deleteRatingsByUserId method of the service', () => {
    const dto = new ReviewByUserId();
    dto.userId = '3b7kj89';
    controller.deleteMany(dto);
    expect(service.deleteRatingsByUserId).toHaveBeenCalled();
    expect(service.deleteRatingsByUserId).toHaveBeenCalledWith(dto.userId);
  });

  it('should call createRating method of the service', () => {
    const dto = new CreateReviewDto();
    dto.itemId = '3b7kj89';
    dto.userId = '3b7kj89';
    controller.addOne(dto);
    expect(service.createRating).toHaveBeenCalled();
    expect(service.createRating).toHaveBeenCalledWith(dto);
  });

  it('should call updateRating method of the service', () => {
    const dto = new UpdateReviewDto();
    dto.itemId = '3b7kj89';
    dto.userId = '3b7kj89';
    controller.updateOne(dto);
    expect(service.updateRating).toHaveBeenCalled();
    expect(service.updateRating).toHaveBeenCalledWith(dto);
  });
});
