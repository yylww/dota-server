import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JWT_SECRET'),
          signOptions: { 
            expiresIn: configService.get('JWT_EXPIRES') 
          },
        }
      },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // exports: [AuthService],
})
export class AuthModule {}
