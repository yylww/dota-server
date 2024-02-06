import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthEntity } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<AuthEntity> {
    const user = await this.usersService.findOneByUsername(username);
    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${username}`);
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException()
    }
    const payload = { userId: user.id};
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
