import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { MatchesModule } from 'src/matches/matches.module';

@Module({
  imports: [MatchesModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
