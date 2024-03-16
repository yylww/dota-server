import { Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TournamentsService {
  constructor(private prisma: PrismaService) {}

  create(createTournamentDto: CreateTournamentDto) {
    return this.prisma.tournament.create({ 
      data: {
        ...createTournamentDto,
        teams: {
          connect: createTournamentDto.teams.map(id => ({ id })),
        },
      }, 
    });
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const or = query ? { title: { contains: query } } : {}
    const list = await this.prisma.tournament.findMany({ 
      where: {
        ...or,
      },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      include: {
        stages: true,
        matches: true,
        teams: true,
      }
    })
    const total = await this.prisma.tournament.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.tournament.findMany({
      include: {
        stages: {
          include: {
            matches: {
              include: {
                teams: true,
              },
            },
          },
        },
      }
    });
  }

  findOne(id: number) {
    return this.prisma.tournament.findUnique({ 
      where: { id },
      include: {
        teams: true,
        result: {
          include: {
            teams: true,
          },
        },
      }
    });
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return this.prisma.tournament.update({
      where: { id },
      data: {
        ...updateTournamentDto,
        teams: {
          set: updateTournamentDto.teams.map(id => ({ id })),
        },
      }
    });
  }

  remove(id: number) {
    return this.prisma.tournament.delete({ where: { id }});
  }
}
