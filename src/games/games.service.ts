import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}
  
  create(createGameDto: CreateGameDto) {
    return this.prisma.game.create({ 
      data: {
        ...createGameDto,
        bans: {
          connect: createGameDto.bans.map(id => ({ id }))
        },
        picks: {
          connect: createGameDto.picks.map(id => ({ id }))
        },
      }, 
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
    const list = await this.prisma.game.findMany({ 
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
        match: true,
        records: true,
        bans: true,
        picks: true,
      }
    })
    const total = await this.prisma.game.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.game.findMany();
  }

  findOne(id: number) {
    return this.prisma.game.findUnique({ where: { id }});
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return this.prisma.game.update({ 
      where: { id },
      data: {
        ...updateGameDto,
        bans: {
          set: updateGameDto.bans.map(id => ({ id }))
        },
        picks: {
          set: updateGameDto.picks.map(id => ({ id }))
        },
      },
    });
  }

  remove(id: number) {
    return this.prisma.game.delete({ where: { id }});
  }
}
