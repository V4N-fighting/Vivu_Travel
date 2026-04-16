import { Controller, Get, Post, Body, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ToursService } from './tours.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles, RolesGuard } from '../../common/guards/roles.guard';

@Controller('tours')
export class ToursController {
  constructor(private readonly toursService: ToursService) {}

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('country_id') countryId: number,
    @Query('min_price') minPrice: number,
    @Query('max_price') maxPrice: number,
  ) {
    return this.toursService.findAll({ search, countryId, minPrice, maxPrice });
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.toursService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() tourData: any) {
    return this.toursService.create(tourData);
  }
}
