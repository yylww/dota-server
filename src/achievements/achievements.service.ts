import { Injectable } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AchievementsService {
  constructor(private prisma: PrismaService) {}

  create(createAchievementDto: CreateAchievementDto) {
    return this.prisma.achievement.create({ 
      data: {
        ...createAchievementDto, 
        players: {
          connect: createAchievementDto.players.map(id => ({ id }))
        }
      },
    });
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const list = await this.prisma.achievement.findMany({ 
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      include: {
        players: true,
        team: true,
        tournament: true,
      }
    })
    const total = await this.prisma.achievement.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.achievement.findMany();
  }

  findOne(id: number) {
    return this.prisma.achievement.findUnique({ where: { id }});
  }

  update(id: number, updateAchievementDto: UpdateAchievementDto) {
    return this.prisma.achievement.update({
      where: { id },
      data: {
        ...updateAchievementDto,
        players: {
          set: updateAchievementDto.players.map(id => ({ id })),
        }
      }
    });
  }

  // remove(id: number) {
  //   return this.prisma.achievement.delete({ where: { id }});
  // }
}
