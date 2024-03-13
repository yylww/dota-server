import { Injectable } from '@nestjs/common';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class StagesService {
  constructor(private prisma: PrismaService) {}

  create(createStageDto: CreateStageDto) {
    return this.prisma.stage.create({ data: createStageDto });
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const or = query ? { title: { contains: query } }: {}
    const list = await this.prisma.stage.findMany({ 
      where: {
        ...or,
      },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      include: {
        tournament: true,
        matches: true,
        games: true,
      }
    })
    const total = await this.prisma.stage.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.stage.findMany();
  }

  findOne(id: number) {
    return this.prisma.stage.findUnique({ 
      where: { id }, 
      include: { tournament: true },
    });
  }

  update(id: number, updateStageDto: UpdateStageDto) {
    return this.prisma.stage.update({
      where: { id },
      data: updateStageDto,
    });
  }

  remove(id: number) {
    return this.prisma.stage.delete({ where: { id }});
  }
}
