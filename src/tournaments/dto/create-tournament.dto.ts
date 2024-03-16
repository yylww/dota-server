import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateTournamentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  bonus: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  endDate: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  teams: number[];
}
