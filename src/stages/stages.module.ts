import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { StagesController } from './stages.controller';
import { MatchesModule } from 'src/matches/matches.module';

@Module({
  controllers: [StagesController],
  providers: [StagesService],
})
export class StagesModule {}
