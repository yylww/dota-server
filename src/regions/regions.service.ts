import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  create(createRegionDto: CreateRegionDto) {
    return this.prisma.region.create({ data: createRegionDto });
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const or = query ? {
      OR: [
        { cname: { contains: query } },
        { name: { contains: query } },
      ]
    } : {}
    const list = await this.prisma.region.findMany({ 
      where: {
        ...or,
      },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      include: {
        teams: true,
      }
    })
    const total = await this.prisma.region.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findOne(id: number) {
    return this.prisma.region.findUnique({ where: { id }});
  }

  update(id: number, updateRegionDto: UpdateRegionDto) {
    return this.prisma.region.update({
      where: { id },
      data: updateRegionDto,
    });
  }

  remove(id: number) {
    return this.prisma.region.delete({ where: { id }});
  }
}
