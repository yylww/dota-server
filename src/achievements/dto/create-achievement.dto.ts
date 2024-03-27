import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAchievementDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  rank: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  bonus: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  point: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  players: number[];

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  tournamentId: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  teams: number[];
}
