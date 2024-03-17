import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePlayerDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  position: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  status: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  teamId: number;
}
