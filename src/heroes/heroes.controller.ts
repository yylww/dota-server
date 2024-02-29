import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import axios from 'axios';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('heroes')
@ApiTags('heroes')
@ApiBearerAuth()
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  @ApiBearerAuth()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Put()
  @ApiBearerAuth()
  async createMany() {
    const url = 'https://www.dota2.com/datafeed/herolist?language=schinese';
    const { data: { result: { data: { heroes }}} } = await axios.get(url);
    const createData = [];
    for (const hero of heroes) {
      createData.push({
        cname: hero.name_loc,
        name: hero.name_english_loc,
        avatar: `/heroes/${hero.name.split('hero_')[1]}.png`,
      })
    }
    return this.heroesService.createMany(createData);
  }

  @Get()
  @ApiQuery({ name: 'query', required: false, type: String })
  @ApiQuery({ name: 'current', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: String })
  @ApiBearerAuth()
  findMany(
    @Query('pageSize') pageSize?: string,
    @Query('current') current?: string,
    @Query('query') query?: string,
  ) {
    return this.heroesService.findMany(+current, +pageSize, query);
  }

  @Get(':id')
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.heroesService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(+id, updateHeroDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.heroesService.remove(+id);
  }

  @Post('/avatar/upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
      ],
    })
  ) file: Express.Multer.File) {
    return {
      url: `/heroes/${file.filename}`
    }
  }
}
