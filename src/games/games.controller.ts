import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('games')
@ApiTags('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gamesService.create(createGameDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiQuery({ name: 'query', required: false, type: String })
  @ApiQuery({ name: 'current', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: String })
  @ApiBearerAuth()
  findMany(
    @Query('pageSize') pageSize?: string,
    @Query('current') current?: string,
    @Query('query') query?: string,
  ) {
    return this.gamesService.findMany(+current, +pageSize, query);
  }

  @Get('/all')
  @ApiBearerAuth()
  findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.gamesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    return this.gamesService.update(id, updateGameDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.gamesService.remove(id);
  }
}
