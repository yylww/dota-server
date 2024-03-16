import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TeamsService {
  constructor(private prisma: PrismaService) {}

  create(createTeamDto: CreateTeamDto) {
    return this.prisma.team.create({ data: createTeamDto });
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const or = query ? {
      OR: [
        { name: { contains: query } },
      ]
    } : {}
    const list = await this.prisma.team.findMany({ 
      where: {
        ...or,
      },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      include: {
        players: true,
        region: true,
        matches: true,
      }
    })
    const total = await this.prisma.team.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.team.findMany({
      include: {
        players: true,
      }
    });
  }

  findOne(id: number) {
    return this.prisma.team.findUnique({ where: { id }});
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({
      where: { id },
      data: updateTeamDto,
    });
  }

  remove(id: number) {
    return this.prisma.team.delete({ where: { id }});
  }
}
