import { ApiProperty } from "@nestjs/swagger";
import { Region, Team } from "@prisma/client";

export class TeamEntity implements Team {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  logo: string;

  @ApiProperty()
  tag: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  regionId: number;

  @ApiProperty()
  region: Region;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
