// import { PartialType } from '@nestjs/swagger';
// import { CreateGameDto } from './create-game.dto';

// export class UpdateGameDto extends PartialType(CreateGameDto) {}

import { ApiProperty } from "@nestjs/swagger";
import { Record } from "@prisma/client";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateGameDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  type: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startTime: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  duration: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  radiantTeamId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  direTeamId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stageId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  matchId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  bans: number[];

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  picks: number[];

  // @IsArray()
  // @IsOptional()
  // @ApiProperty()
  // records: Record[];
}
