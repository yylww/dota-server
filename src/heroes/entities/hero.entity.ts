import { Hero } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class HeroEntity implements Hero {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cname: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}