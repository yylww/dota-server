import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRecordDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  playerId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  gameId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  heroId: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  radiant: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  win: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  xpm: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  gpm: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  kills: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  deaths: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  assists: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  level: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  heroDamage: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  towerDamage: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  lastHits: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  denies: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  netWorth: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  healing: number;
}
