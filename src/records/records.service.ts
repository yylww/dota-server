import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  create(createRecordDto: CreateRecordDto) {
    return this.prisma.record.create({ data: createRecordDto });
  }

  async findMany(current?: number, pageSize?: number, query?: string) {
    const take = pageSize || 10;
    const skip = (current - 1) * take || 0;
    const list = await this.prisma.record.findMany({ 
      take: Number(take) || 10, 
      skip: Number(skip) || 0,
      include: {
        player: true,
        game: {
          include: {
            radiant: true,
            dire: true,
          },
        },
        hero: true,
      }
    })
    const total = await this.prisma.record.count()
    return {
      list,
      current,
      pageSize,
      total
    }
  }

  findAll() {
    return this.prisma.record.findMany();
  }

  findOne(id: number) {
    return this.prisma.record.findUnique({ where: { id }});
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    return this.prisma.record.update({
      where: { id },
      data: updateRecordDto,
    });
  }

  remove(id: number) {
    return this.prisma.record.delete({ where: { id }});
  }
}
