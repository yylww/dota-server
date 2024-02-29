import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  gameId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  position: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  teamId: number;
}
