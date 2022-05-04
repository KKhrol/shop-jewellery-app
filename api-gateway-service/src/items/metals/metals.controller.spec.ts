import { Test, TestingModule } from '@nestjs/testing';
import { MetalsController } from './metals.controller';

describe('MetalsController', () => {
  let controller: MetalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetalsController],
    }).compile();

    controller = module.get<MetalsController>(MetalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
