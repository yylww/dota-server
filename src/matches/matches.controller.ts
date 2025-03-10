import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';

@Controller('matches')
@ApiTags('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  @Public()
  @Get()
  @ApiQuery({ name: 'current', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: String })
  @ApiQuery({ name: 'query', required: false, type: String })
  @ApiBearerAuth()
  findMany(
    @Query('pageSize') pageSize?: string,
    @Query('current') current?: string,
    @Query('query') query?: string,
  ) {
    return this.matchesService.findMany(+current, +pageSize, query);
  }

  @Public()
  @Get('/all')
  findAll() {
    return this.matchesService.findAll();
  }

  @Public()
  @Get('/preview')
  findPreview() {
    return this.matchesService.findPreview();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(+id, updateMatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchesService.remove(+id);
  }
}
