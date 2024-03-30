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
    const list = await this.prisma.match.findMany({ 
      where: {
        teams: {
          some: {
            tag: {
              contains: query || undefined,
              mode: 'insensitive',
            },
          }
        },
      },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      orderBy: [
        { updatedAt: 'desc' },
      ],
      include: {
        tournament: true,
        stage: true,
        teams: true,
        games: {
          include: {
            records: true,
          },
        },
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

  findPreview() {
    return this.prisma.match.findMany({
      where: {
        startTime: {
          gt: new Date('2024-03-10')
        }
      },
      include: {
        teams: true,
        games: true,
      }
    });
  }

  async findOne(id: number) {
    return this.prisma.match.findUnique({ 
      where: { id },
      include: {
        tournament: true,
        stage: true,
        teams: true,
        games: {
          include: {
            records: true,
          }
        },
      }
    })
  }

  update(id: number, updateMatchDto: UpdateMatchDto) {
    return this.prisma.match.update({ 
      where: { id },
      data: {
        ...updateMatchDto,
        teams: updateMatchDto.teams ? { set: updateMatchDto.teams.map(id => ({ id }))} : undefined,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.match.delete({ where: { id }});
  }
}
