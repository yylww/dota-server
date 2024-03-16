import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateStageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  rule: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  tournamentId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  mode: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  bo: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  type: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  groups: object;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;
}
