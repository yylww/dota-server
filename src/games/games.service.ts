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
        records: {
          create: createGameDto.records,
        },
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
    const list = await this.prisma.game.findMany({ 
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
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
        // records: {
        //   connect: updateGameDto.records,
        // },
        bans: {
          set: updateGameDto.bans.map(id => ({ id }))
        },
        picks: {
          set: updateGameDto.picks.map(id => ({ id }))
        },
      },
    });
  }

  async remove(id: string) {
    await this.prisma.game.update({
      where: { id },
      data: {
        records: {
          deleteMany: {},
        },
      },
    })
    return this.prisma.game.delete({ where: { id }});
  }
}
