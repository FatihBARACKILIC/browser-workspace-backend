import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PhotographersService } from './photographers.service';
import { CreatePhotographerDto } from './dto/create-photographer.dto';

@Controller('photographers')
export class PhotographersController {
  constructor(private readonly photographersService: PhotographersService) {}

  @Post()
  create(@Body() createPhotographerDto: CreatePhotographerDto) {
    return this.photographersService.create(createPhotographerDto);
  }

  // @Get()
  // findAll() {
  //   return this.photographersService.findAll();
  // }

  @Get(':idOrUsername')
  findOne(@Param('idOrUsername') idOrUsername: string) {
    try {
      return this.photographersService.findOne(idOrUsername);
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND &&
        !idOrUsername.startsWith('@')
      ) {
        throw new NotFoundException(
          'The photographer could not be found. To search by username, search @username.',
        );
      }
    }
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.photographersService.update(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photographersService.remove(id);
  }
}
