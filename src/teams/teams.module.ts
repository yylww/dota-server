import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: `./statics/teams`,
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      })
    })
  ],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
