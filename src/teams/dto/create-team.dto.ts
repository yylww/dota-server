import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTeamDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tag: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  logo: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  regionId: number;
}
