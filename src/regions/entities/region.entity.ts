import { ApiProperty } from "@nestjs/swagger";
import { Region } from "@prisma/client";

export class RegionEntity implements Region {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cname: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
