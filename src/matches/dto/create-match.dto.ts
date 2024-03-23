import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateMatchDto {
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startTime: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  bo: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  type: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  group: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  extra: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  stageId: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  teams: number[];
}
