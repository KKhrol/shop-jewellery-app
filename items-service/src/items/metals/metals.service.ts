import { Injectable } from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMetalDto } from './interfaces/create-metal.interface';
import { DeleteMetalDto } from './interfaces/deleted-metal-output.interface';
import { Metal } from './interfaces/metal.interface';
import { UpdateMetalDto } from './interfaces/update-metal.interface';

@Injectable()
export class MetalsService {
  constructor(private prisma: PrismaService) {}
  async updateMetal(data: UpdateMetalDto): Promise<Metal | null> {
    if (data.id) {
      const metalUpdated = await this.prisma.metal.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          image: data.image,
          care: data.care,
        },
      });
      return metalUpdated;
    }
    return null;
  }

  async addMetal(data: CreateMetalDto): Promise<Metal> {
    const metalAdded = await this.prisma.metal.create({
      data: {
        name: data.name,
        image: data.image,
        care: data.care,
      },
    });
    return metalAdded;
  }

  async getMetals(): Promise<Observable<Metal>> {
    const metals = await this.prisma.metal.findMany();
    const result = from(metals);

    return result;
  }

  async deleteMetal(id: string): Promise<DeleteMetalDto> {
    const deletedMetal = await this.prisma.metal.delete({
      where: {
        id,
      },
    });
    const result = { message: 'Metal was deleted!' };
    return result;
  }
}
