import { ApiProperty } from "@nestjs/swagger";

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  username: string;
}