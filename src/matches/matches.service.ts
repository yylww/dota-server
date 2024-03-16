import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  create(createMatchDto: CreateMatchDto) {
    return this.prisma.match.create({ 
      data: {
        ...createMatchDto,
        teams: {
          connect: createMatchDto.teams.map(id => ({ id }))
        }
      }
    });
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    // const or = query ? {
    //   OR: [
    //     { teams: { contains: query } },
    //     { name: { contains: query } },
    //   ],
    // } : {}
    const list = await this.prisma.match.findMany({ 
      // where: {
      //   teams: {
      //     name: query,
      //   },
      // },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      include: {
        tournament: true,
        stage: true,
        teams: true,
        games: true,
      }
    })
    const total = await this.prisma.match.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.match.findMany();
  }

  findOne(id: number) {
    return this.prisma.match.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        stage: true,
        teams: true,
        games: true,
      }
    });
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return this.prisma.match.update({ 
      where: { id },
      data: {
        ...updateMatchDto,
        teams: {
          set: updateMatchDto.teams.map(id => ({ id })),
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.match.delete({ where: { id }});
  }
}
