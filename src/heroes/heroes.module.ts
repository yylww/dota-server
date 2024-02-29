import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: `./statics/heroes`,
        filename: (req, file, cb) => {
          return cb(null, file.originalname);
        },
      })
    })
  ],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
