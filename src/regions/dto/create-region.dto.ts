import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRegionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
