import { ApiProperty } from "@nestjs/swagger";
import { Player, Team } from "@prisma/client";

export class PlayerEntity implements Player {
  @ApiProperty()
  id: number;

  @ApiProperty()
  status: number;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  position: string;

  @ApiProperty()
  teamId: number;

  @ApiProperty()
  team: Team;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
