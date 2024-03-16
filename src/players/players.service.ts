import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}
  
  create(createPlayerDto: CreatePlayerDto) {
    return this.prisma.player.create({ data: createPlayerDto });
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const or = query ? { nickname: { contains: query }}: {}
    const list = await this.prisma.player.findMany({ 
      where: {
        ...or,
      },
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      include: {
        team: true,
        achievements: true,
      }
    })
    const total = await this.prisma.player.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.player.findMany();
  }

  findOne(id: number) {
    return this.prisma.player.findUnique({ where: { id }});
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
    });
  }

  remove(id: number) {
    return this.prisma.player.delete({ where: { id }});
  }
}
