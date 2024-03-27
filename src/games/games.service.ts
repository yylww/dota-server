import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GamesService {
  constructor(
    private prisma: PrismaService,
  ) {}
  
  async create(createGameDto: CreateGameDto) {
    const game = await this.prisma.game.create({ 
      data: {
        ...createGameDto,
        records: {
          create: createGameDto.records,
        },
        bans: {
          create: createGameDto.bans
        },
        picks: {
          create: createGameDto.picks
        },
      }, 
    })
    return game
  }

  async findMany(current?: number, pageSize?: number, query?: string, matchId?: number) {
    console.log(matchId)
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const list = await this.prisma.game.findMany({ 
      where: {
        matchId: matchId || undefined,
      },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      orderBy: [
        { startTime: 'desc' },
      ],
      include: {
        tournament: true,
        stage: true,
        match: true,
        radiant: true,
        dire: true,
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

  findOne(id: string) {
    return this.prisma.game.findUnique({ where: { id }});
  }

  update(id: string, updateGameDto: UpdateGameDto) {
    return this.prisma.game.update({ 
      where: { id },
      data: {
        ...updateGameDto,
      },
    });
  }

  async remove(id: string) {
    // 删除game时，先删除相关records
    await this.prisma.game.update({
      where: { id },
      data: {
        records: {
          deleteMany: {},
        },
      },
    })
    return this.prisma.game.delete({ where: { id }})
  }
}
