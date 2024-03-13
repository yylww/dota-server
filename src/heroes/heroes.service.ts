import { Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class HeroesService {
  constructor(private prisma: PrismaService) {}

  create(createHeroDto: CreateHeroDto) {
    return this.prisma.hero.create({ data: createHeroDto });
  }

  createMany(createHeroesDto: CreateHeroDto[]) {
    return this.prisma.hero.createMany({
      data: createHeroesDto,
      skipDuplicates: true,
    })
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const or = query ? {
      OR: [
        { cname: { contains: query } },
        { name: { contains: query } },
      ],
    } : {}
    const list = await this.prisma.hero.findMany({ 
      where: {
        ...or,
      },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
    });
    const total = await this.prisma.hero.count();
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.hero.findMany();
  }

  findOne(id: number) {
    return this.prisma.hero.findUnique({ where: { id }});
  }

  update(id: number, updateHeroDto: UpdateHeroDto) {
    return this.prisma.hero.update({
      where: { id },
      data: updateHeroDto,
    });
  }

  // remove(id: number) {
  //   return this.prisma.hero.delete({ where: { id }});
  // }
}
