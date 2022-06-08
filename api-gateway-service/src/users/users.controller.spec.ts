import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const mockSubject = {
      query: () => true,
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .useValue(mockSubject)
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = ['test'];
      jest.spyOn(service, 'getAllUsers').mockImplementation(() => result);

      expect(await controller.getAllUsers()).toBe(result);
    });
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  });
});
