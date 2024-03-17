import { ApiProperty } from "@nestjs/swagger";
import { Record } from "@prisma/client";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

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

  @IsArray()
  @IsOptional()
  @ApiProperty()
  records: Record[];
}
