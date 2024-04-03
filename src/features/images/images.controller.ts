import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  // @Get()
  // findAll() {
  //   return this.imagesService.findAll();
  // }

  @Get(':id/:slug')
  findOne(@Param('id') id: string, @Param('slug') _slug: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.imagesService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
