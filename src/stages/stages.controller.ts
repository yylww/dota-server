import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StagesService } from './stages.service';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('stages')
@ApiTags('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createStageDto: CreateStageDto) {
    return this.stagesService.create(createStageDto);
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
    return this.stagesService.findMany(+current, +pageSize, query);
  }

  @Get('/all')
  @ApiBearerAuth()
  findAll() {
    return this.stagesService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.stagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateStageDto: UpdateStageDto) {
    return this.stagesService.update(+id, updateStageDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.stagesService.remove(+id);
  }
}
