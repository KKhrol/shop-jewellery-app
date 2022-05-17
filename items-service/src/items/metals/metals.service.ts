import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMetalDto } from './interfaces/create-metal.interface';
import { DeleteMetalDto } from './interfaces/deleted-metal-output.interface';
import { Metal } from './interfaces/metal.interface';
import { UpdateMetalDto } from './interfaces/update-metal.interface';

@Injectable()
export class MetalsService {
  constructor(private prisma: PrismaService) {}
  async updateMetal(data: UpdateMetalDto): Promise<Metal> {
    if (!data.id) {
      throw new RpcException("Mandatory metal id wasn't provided");
    }
    const metalUpdated = await this.prisma.metal
      .update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          image: data.image,
          care: data.care,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!metalUpdated) {
      throw new RpcException("The metal wasn't updated");
    }
    return metalUpdated;
  }

  async addMetal(data: CreateMetalDto): Promise<Metal> {
    const metalAdded = await this.prisma.metal
      .create({
        data: {
          name: data.name,
          image: data.image,
          care: data.care,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!metalAdded) {
      throw new RpcException("The metal wasn't created");
    }
    return metalAdded;
  }

  async getMetals(): Promise<Metal[]> {
    const metals = await this.prisma.metal.findMany().catch((error) => {
      throw new RpcException(error);
    });

    if (!metals) {
      throw new RpcException('No metals were found.');
    }
    return metals;
  }

  async deleteMetal(id: string): Promise<DeleteMetalDto> {
    const deletedMetal = await this.prisma.metal
      .delete({
        where: {
          id,
        },
      })
      .catch((error) => {
        throw new RpcException(error);
      });

    if (!deletedMetal) {
      throw new RpcException("The metal wasn't deleted");
    }
    return { message: 'Metal was deleted!' };
  }
}
