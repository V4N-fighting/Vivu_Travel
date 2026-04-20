import { Controller, Get } from '@nestjs/common';
import { TourTypesService } from './tour-types.service';

@Controller('tour-types')
export class TourTypesController {
  constructor(private readonly tourTypesService: TourTypesService) {}

  @Get()
  async findAll() {
    return this.tourTypesService.findAll();
  }
}
